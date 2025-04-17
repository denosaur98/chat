<template>
  <div class="chat-window">
    <div class="window__navigation">
      <h1>Личный помощник</h1>
      <div class="navigation__info">
        <p class="info__nickname">Jim Davidson</p>
        <p class="info__mail">Jim Davidson@adaurum.ru</p>
        <button class="info__menu" @click="togglePopup">
          <img src="../../public/assets/icons/burger-icon.svg">
        </button>
        <Transition name="fade">
          <div class="info__popup" v-if="isPopupOpen" v-click-outside="closePopup">
            <button class="popup__button" @click="closePopup">Обратная связь о работе сервиса</button>
            <button class="popup__button" @click="closePopup">Сменить помощника</button>
          </div>
        </Transition>
      </div>
    </div>
    <div class="place__chat" ref="messagesContainer">
      <p class="start__chat-time">Сегодня, 20:43</p>
      <div v-for="(message, index) in messages" :key="index" class="chat__message-wrapper"
        :class="{ 'my-message': message.isMine }">
        <img :src="message.isMine ? userAvatar : botAvatar">
        <div class="message__content">
          <p class="message__item">{{ message.text }}</p>
          <div class="item__info">
            <p class="info__name">{{ message.isMine ? userName : 'Ассистент' }}</p>
            <p class="info__time">{{ message.time }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="chat__text-place-wrapper">
      <div class="chat__offers-buttons-wrapper">
        <button class="chat__offers-button media__plan" @click="orderDocument('mediaPlan')">Заказать медиаплан</button>
        <button class="chat__offers-button report" @click="orderDocument('report')">Заказать отчет</button>
      </div>
      <div class="text__place-item">
        <div class="item__controls">
          <textarea v-model="newMessage" @keyup.enter="sendMessage"></textarea>
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
import { ref, nextTick } from 'vue'

const isPopupOpen = ref(false)
const messagesContainer = ref(null)

function togglePopup() {
  isPopupOpen.value = !isPopupOpen.value
}

function closePopup(event) {
  if (!event?.target.closest('.info__menu')) {
    isPopupOpen.value = false
  }
}

const userAvatar = ref('/assets/icons/user-icon.svg')
const botAvatar = ref('/assets/images/user.png')
const userName = ref('Jim Davidson')
const newMessage = ref('')
const messages = ref([])

function formatTime() {
  const now = new Date()
  return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

function sendMessage() {
  if (!newMessage.value.trim()) return

  messages.value.push({
    text: newMessage.value,
    isMine: true,
    time: formatTime()
  })

  newMessage.value = ''

  setTimeout(() => {
    messages.value.push({
      text: `Вы написали: "${messages.value[messages.value.length - 1].text}"`,
      isMine: false,
      time: formatTime()
    })

    scrollToBottom()
  }, 1000)

  scrollToBottom()
}

function scrollToBottom() {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
}

function orderDocument(document) {
  const randomId = Math.floor(10000 + Math.random() * 90000)

  if(document === 'mediaPlan') {
    messages.value.push({
      text: `Новый медиаплан № ${randomId} успешно создан!`,
      isMine: false,
      time: formatTime()
    })

    scrollToBottom()
  } else {
    messages.value.push({
      text: `Новый отчет № ${randomId} успешно сформирован!`,
      isMine: false,
      time: formatTime()
    })

    scrollToBottom()
  }
}

messages.value.push({
  text: 'Добрый день! Чем могу помочь?',
  isMine: false,
  time: formatTime()
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
    align-items: center;
    justify-content: space-between;
    width: 100%;

    @media (max-width: 800px) {
      position: relative;
      flex-direction: column;
      align-items: flex-start;
      gap: 20px;
    }

    h1 {
      color: rgb(0, 0, 0);
      font-size: 24px;
      font-weight: 600;
      line-height: 29px;
      letter-spacing: 0%;
      text-align: left;
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

      .info__popup {
        position: absolute;
        display: flex;
        flex-direction: column;
        padding: 15px 30px;
        width: 330px;
        gap: 10px;
        border-radius: 8px;
        box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.08);
        top: 50px;
        right: 0;
        z-index: 999;
        background: #fff;

        .popup__button {
          cursor: pointer;
          border: none;
          background: none;
          color: rgb(0, 0, 0);
          font-size: 16px;
          font-weight: 500;
          line-height: 19px;
          text-align: right;
          width: 100%;

          &:hover {
            color: rgb(238, 38, 194);
            transition: .2s;
          }
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

        &.media__plan {
          background: rgb(238, 38, 194);

          @media (max-width: 800px) {
            order: 2;
          }
        }

        &.report {
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>