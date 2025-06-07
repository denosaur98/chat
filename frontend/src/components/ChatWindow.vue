<template>
  <div class="chat-window">
    <div class="window__navigation">
      <div class="navigation__header">
        <h1>Личный помощник</h1>
        <div class="header__nav-buttons">
          <button
            v-for="button in messengers"
            :key="button.id"
            @click="changeMessenger(button.id)"
            class="nav-button"
            :class="{ 'active__messenger': activeMessenger === button.id }"
          >
            <font-awesome-icon :icon="button.icon" />
          </button>
        </div>
      </div>
      <div class="navigation__info">
        <p class="info__nickname">{{ store.state.userData.name }}</p>
        <p class="info__mail">{{ store.state.userData.email }}</p>
        <button class="info__menu" @click="togglePopup">
          <img src="../../public/assets/icons/burger-icon.svg">
        </button>
        <BasePopup :isOpen="isPopupOpen" @close="closePopup">
          <button @click="closePopup">Обратная связь о работе сервиса</button>
          <button @click="closePopup">Сменить помощника</button>
        </BasePopup>
      </div>
    </div>
    <div class="place__chat" ref="messagesContainer"  v-if="!isLoading && messages.length > 0">
      <p class="start__chat-time">{{ formatChatStartTime() }}</p>
      <div v-for="(message, index) in messages" :key="index" class="chat__message-wrapper" :class="{ 'my-message': message.isMine }">
        <img :src="message.isMine ? userAvatar : botAvatar">
        <div class="message__content">
          <p class="message__item">{{ message.text }}</p>
          <div class="item__info">
            <p class="info__name">{{ message.isMine ? store.state.userData.name : 'Ассистент' }}</p>
            <p class="info__time">{{ message.time }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="chat__is-empty" v-else>
      <img src="../../public/assets/images/chat-empty.png">
      <p>Чат недоступен, проверьте интернет-соединение</p>
    </div>
    <div class="chat__text-place-wrapper">
      <div class="chat__offers-buttons-wrapper">
        <button
          v-for="buttons in quickButtons.buttonItems"
          :key="buttons.id"
          class="chat__offers-button"
          @click="orderDocument(buttons.id)"
        >
          {{ buttons.text }}
        </button>
      </div>
      <div class="text__place-item">
        <div class="item__controls">
          <textarea
            v-model="newMessage"
            @keyup.enter="sendMessage"
            :maxlength="textLimit || undefined"
            @input="updateRemainingChars"
          />
          <p
            v-if="textLimit !== null"
            class="char-counter"
            :class="{
              'char-counter--warning': remainingChars < 100,
              'char-counter--error': remainingChars < 20
            }"
          >
            Осталось символов: {{ remainingChars }}
          </p>
          <div class="controls__buttons-wrapper">
            <div class="file-input-wrapper">
              <input type="file" class="file-input">
              <img src="../../public/assets/icons/folder-icon.svg" class="file-icon">
            </div>
            <div class="file-input-wrapper">
              <input type="file" class="file-input">
              <img src="../../public/assets/icons/gallery-icon.svg" class="file-icon">
            </div>
          </div>
        </div>
        <button class="send__message-button" @click="sendMessage">
          <img src="../../public/assets/icons/send-icon.svg">
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, nextTick } from 'vue'
import store from '../store/index'
import BasePopup from './BasePopup.vue'

const messagesContainer = ref(null)

const isPopupOpen = ref(false)
function togglePopup() {
  isPopupOpen.value = !isPopupOpen.value
}
function closePopup() {
  isPopupOpen.value = false
}

const userAvatar = ref('/assets/icons/user-icon.svg')
const botAvatar = ref('/assets/images/user.png')
const newMessage = ref('')
const messages = ref([])

function formatTime() {
  const now = new Date()
  return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

function formatChatStartTime() {
  if (messages.value.length === 0) return ''

  const firstMessageDate = messages.value[0].createdAt ? new Date(messages.value[0].createdAt) : new Date()

  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }

  return firstMessageDate.toLocaleDateString('ru-RU', options)
}

async function sendMessage() {
  if (!newMessage.value.trim()) return

  if (textLimit.value != null && newMessage.value.length > textLimit.value) {
    addBotMessage(`Сообщение слишком длинное. Максимум ${textLimit.value} символов.`)
    return
  }

  messages.value.push({
    text: newMessage.value,
    isMine: true,
    time: formatTime()
  })

  scrollToBottom()

  try {
    await store.dispatch('sendMessage', newMessage.value)

    await store.dispatch('fetchMessages')

    setTimeout(() => {
      addBotMessage(`Вы написали: "${newMessage.value}"`)
      newMessage.value = ''
      if (textLimit.value !== null) {
        remainingChars.value = textLimit.value
      }
    }, 1000)

  } catch(e) {
    console.error(e)
  }
}

function scrollToBottom() {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
}

function addBotMessage(text) {
  messages.value.push({
    text,
    isMine: false,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  })
  scrollToBottom()
}

const isLoading = ref(true)

const quickButtons = ref([])
const textLimit = ref(4096)
const remainingChars = ref(4096)
const activeMessenger = ref('telegram')
const messengers = reactive([
  { id: 'telegram', icon: ['fab', 'telegram'] },
  { id: 'whatsapp', icon: ['fab', 'square-whatsapp'] },
  { id: 'vk', icon: ['fab', 'vk'] },
  { id: 'sms', icon: ['fas', 'sms'] },
])
async function changeMessenger(messengerId) {
  activeMessenger.value = messengerId
  quickButtons.value = await store.dispatch('fetchQuickButtons', messengerId)
  textLimit.value = quickButtons.value.limit ?? null
  remainingChars.value = textLimit.value !== null ? textLimit.value - newMessage.value.length : null
}
async function orderDocument(buttonId) {
  const responseText = await store.dispatch('chooseQuickButton', {
    messenger: activeMessenger.value,
    buttonId: buttonId
  })

  messages.value.push({
    text: responseText,
    isMine: false,
    time: formatTime()
  })

  scrollToBottom()
}
function updateRemainingChars() {
  if (textLimit.value !== null) {
    remainingChars.value = textLimit.value - newMessage.value.length
  }
}

onMounted(async () => {
  messages.value = await store.dispatch('fetchMessages') || []
  quickButtons.value = await store.dispatch('fetchQuickButtons', activeMessenger.value) || []
  textLimit.value = quickButtons.value.limit ?? 4096
  remainingChars.value = textLimit.value
  isLoading.value = false
  scrollToBottom()
})
</script>

<style lang="scss" scoped>
.chat-window {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 28px;
  background: #fff;
  border-radius: 20px;
  width: 100%;
  height: 100%;
  height: 600px;

  @media (max-width: 800px) {
    padding: 0;
    height: 800px;
  }

  .window__navigation {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    width: 100%;

    @media (max-width: 800px) {
      position: relative;
      flex-direction: column;
      align-items: flex-start;
      gap: 20px;
    }

    .navigation__header {
      display: flex;
      align-items: flex-start;
      flex-direction: column;
      gap: 10px;

      h1 {
        color: rgb(0, 0, 0);
        font-size: 24px;
        font-weight: 600;
        line-height: 29px;
        letter-spacing: 0%;
        text-align: left;
      }

      .header__nav-buttons {
        display: flex;
        align-items: center;
        gap: 10px;

        .nav-button {
          cursor: pointer;
          display: flex;
          width: 25px;
          height: 25px;
          background: none;
          border: none;
          transition: .3s;

          svg {
            width: 100%;
            height: 100%;
          }

          &.active__messenger { color: rgb(238, 38, 194); }
        }
      }
    }

    .navigation__info {
      position: relative;
      display: flex;
      align-items: center;
      gap: 10px;

      @media (max-width: 800px) {
        position: static;
      }

      .info__nickname {
        font-size: 15px;
        font-weight: 600;
      }

      .info__mail {
        color: rgb(82, 82, 82);
        font-size: 15px;
        font-weight: 400;
      }

      .info__menu {
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: rgb(245, 245, 245);
        border: none;
        margin-left: 15px;

        @media (max-width: 800px) {
          position: absolute;
          top: 0;
          right: 0;
        }
      }
    }
  }

  .place__chat {
    position: relative;
    display: flex;
    flex-direction: column;
    height: calc(100% - 160px);
    width: 100%;
    padding: 20px 20px 128px 20px;
    overflow-y: auto;
    background: rgb(235, 235, 235);
    --scrollbar-background: #f5f5f5;
    --scrollbar-thumb: rgb(244, 212, 237);
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    margin: 20px 0 0;

    @media (max-width: 800px) {
      height: calc(100% - 245px);
    }

    &::-webkit-scrollbar {
      width: 6px;
      background-color: var(--scrollbar-background);
    }

    &::-webkit-scrollbar-thumb {
      background-color: var(--scrollbar-thumb);
    }

    &::-webkit-scrollbar-thumb:hover {
      background-color: var(--scrollbar-thumb);
    }

    .start__chat-time {
      color: rgb(82, 82, 82);
      font-size: 15px;
      font-weight: 400;
      line-height: 135%;
      letter-spacing: 0%;
      text-align: left;
      margin: 0 auto;
      margin-bottom: 35px;
    }

    .chat__message-wrapper {
      display: flex;
      align-items: flex-start;
      gap: 15px;
      margin-bottom: 30px;

      img {
        max-width: 50px;
        max-height: 50px;
        height: 100%;
        width: 100%;
        background-size: cover;
      }

      &.my-message {
        justify-content: flex-end;

        .message__content {
          align-items: flex-start;

          .message__item {
            max-width: 500px;
            width: 100%;
            background: rgb(244, 212, 237);
            border-radius: 12px 12px 0 12px;
            word-break: break-word;
            overflow-wrap: anywhere;
            hyphens: auto;
          }
        }
      }

      .message__content {
        display: flex;
        flex-direction: column;
        gap: 8px;

        .message__item {
          max-width: 500px;
          width: 100%;
          background: #fff;
          padding: 15px 20px;
          color: rgb(0, 0, 0);
          font-size: 16px;
          font-weight: 500;
          line-height: 145%;
          text-align: left;
          border-radius: 12px;
          word-break: break-word;
          overflow-wrap: anywhere;
          hyphens: auto;
        }

        .item__info {
          display: flex;
          align-items: center;
          gap: 8px;

          .info__name {
            color: rgb(0, 0, 0);
            font-size: 18px;
            font-weight: 600;
            line-height: 22px;
            text-align: left;
          }

          .info__time {
            color: rgb(82, 82, 82);
            font-size: 15px;
            font-weight: 400;
            line-height: 135%;
            text-align: left;
          }
        }
      }
    }
  }

  .chat__is-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    gap: 10px;
    padding-top: 20px;

    img {
      width: 220px;
      height: auto;
    }

    p {
      color: rgb(0, 0, 0);
      font-size: 16px;
      font-weight: 500;
      line-height: 145%;
      text-align: center;
    }
  }

  .chat__text-place-wrapper {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    gap: 20px;
    bottom: 28px;
    left: 0;
    padding: 0 28px;

    @media (max-width: 800px) {
      padding: 0;
    }

    .chat__offers-buttons-wrapper {
      display: flex;
      align-items: center;
      padding: 0 20px;
      gap: 12px;

      @media (max-width: 800px) {
        margin-left: auto;
        flex-direction: column;
        align-items: flex-end;
      }

      .chat__offers-button {
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 12px 22px;
        border-radius: 20px;
        color: rgb(255, 255, 255);
        font-size: 16px;
        font-weight: 600;
        line-height: 19px;
        border: none;

        &:first-child {
          background: rgb(238, 38, 194);

          @media (max-width: 800px) {
            order: 2;
          }
        }

        &:last-child {
          background: rgb(38, 118, 238);

          @media (max-width: 800px) {
            order: 1;
          }
        }
      }
    }

    .text__place-item {
      display: flex;
      padding: 20px;
      border: 2px solid rgb(238, 38, 194);
      background: rgb(255, 255, 255);
      border-radius: 20px;
      width: 100%;
      height: 145px;

      .item__controls {
        position: relative;
        display: flex;
        flex-direction: column;
        width: 100%;
        gap: 8px;

        textarea {
          border: none;
          resize: none;
          outline: none;
          width: 100%;
          height: 100%;
        }

        .char-counter {
          position: absolute;
          right: -50px;
          top: -15px;
          color: #666;
          font-size: 12px;
          text-align: right;

          &--warning {
            color: orange;
          }

          &--error {
            color: red;
          }
        }

        .controls__buttons-wrapper {
          display: flex;
          align-items: center;
          gap: 20px;

          .file-input-wrapper {
            position: relative;
            display: inline-block;
            cursor: pointer;
            width: 25px;
            height: 25px;

            .file-input {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              height: 100%;
              opacity: 0;
              cursor: pointer;
              z-index: 1;
            }

            .file-icon {
              position: relative;
              z-index: 0;
              width: 100%;
              height: 100%;
              pointer-events: none;
            }

            &:hover {
              cursor: pointer;
            }
          }
        }
      }

      .send__message-button {
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 50px;
        min-height: 50px;
        max-width: 50px;
        max-height: 50px;
        border-radius: 50%;
        background: rgb(238, 38, 194);
        border: none;
        margin-top: auto;
      }
    }
  }
}
</style>