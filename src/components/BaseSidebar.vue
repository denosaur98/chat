<template>
  <div class="base-sidebar">
    <h1 class="sidebar__title">Файлы</h1>
    <div class="accordion-wrapper">
      <div class="sidebar__items-wrapper">
        <button class="sidebar__accordion media__plan-btn" @click="isMediaPlanOpen = !isMediaPlanOpen">
          Медиапланы
          <img src="../../public/assets/icons/arrow-icon.svg" class="arrow-icon" :class="isMediaPlanOpen ? 'active' : ''">
          <img src="../../public/assets/icons/checkmark-icon.svg" class="checkmark-icon" v-if="props.filesData && props.filesData.mediaPlans.length > 0">
        </button>
        <Transition name="fade">
          <div class="document__container" v-if="isMediaPlanOpen">
            <div class="items__document-wrapper" v-for="document in props.filesData.mediaPlans" :key="document.id">
              <div class="items__document">
                <img src="../../public/assets/icons/document-icon.svg" class="document__icon">
                <h2 class="document__title">{{ document.title }}</h2>
                <button :class="document.status === 'prepare' ? 'document__button refresh' : 'document__button download'">
                  <img src="../../public/assets/icons/refresh-icon.svg" v-if="document.status === 'prepare'">
                  <img src="../../public/assets/icons/download-icon.svg" v-else>
                </button>
              </div>
              <div class="document__warning" v-if="document.status === 'prepare'">
                <img src="../../public/assets/icons/warning-icon.svg">
                <p>Медиаплан в процессе составления</p>
              </div>
            </div>
            <button class="items__show-more">Показать еще</button>
          </div>
        </Transition>
      </div>
      <div class="sidebar__items-wrapper">
        <button class="sidebar__accordion reports__btn" @click="isReportsOpen = !isReportsOpen">
          Отчеты
          <img src="../../public/assets/icons/arrow-icon.svg" class="arrow-icon" :class="isReportsOpen ? 'active' : ''">
          <img src="../../public/assets/icons/checkmark-icon.svg" class="checkmark-icon" v-if="props.filesData && props.filesData.mediaPlans.length > 0">
        </button>
        <Transition name="fade">
          <div class="document__container" v-if="isReportsOpen">
            <div class="items__document-wrapper" v-for="document in props.filesData.reports" :key="document.id">
              <div class="items__document">
                <img src="../../public/assets/icons/document-icon.svg" class="document__icon">
                <h2 class="document__title">{{ document.title }}</h2>
                <button :class="document.status === 'prepare' ? 'document__button refresh' : 'document__button download'">
                  <img src="../../public/assets/icons/refresh-icon.svg" v-if="document.status === 'prepare'">
                  <img src="../../public/assets/icons/download-icon.svg" v-else>
                </button>
              </div>
              <div class="document__warning" v-if="document.status === 'prepare'">
                <img src="../../public/assets/icons/warning-icon.svg">
                <p>Отчет в процессе составления</p>
              </div>
            </div>
            <button class="items__show-more">Показать еще</button>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue';

const isMediaPlanOpen = ref(false)
const isReportsOpen = ref(false)

const props = defineProps({
  filesData: {
    type: Object,
    required: true
  }
})
</script>

<style lang="scss" scoped>
.base-sidebar {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  max-width: 295px;
  padding: 28px 20px;
  background: #fff;
  border-radius: 20px;
  width: 100%;
  gap: 30px;
  height: 100%;
  height: 600px;
  overflow-y: auto;
  --scrollbar-background: #f5f5f5;
  --scrollbar-thumb: rgb(244, 212, 237);

  @media (max-width: 1100px) {
    width: 100%;
    max-width: 100%;
    height: max-content;
  }

  @media (max-width: 800px) {
    padding: 5px;
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

  .sidebar__title {
    color: rgb(0, 0, 0);
    font-size: 24px;
    font-weight: 600;
    line-height: 29px;
    letter-spacing: 0%;
    text-align: left;

    @media (max-width: 800px) {
      display: none;
    }
  }

  .accordion-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 30px;

    @media (max-width: 1100px) {
      flex-direction: row;
    }

    @media (max-width: 800px) {
      gap: 8px;
    }

    .sidebar__items-wrapper {
      display: flex;
      flex-direction: column;
      width: 100%;
      gap: 8px;

      .sidebar__accordion {
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        color: rgb(0, 0, 0);
        font-size: 18px;
        font-weight: 600;
        line-height: 22px;
        letter-spacing: 0%;
        text-align: left;
        border: none;
        background: none;

        @media (max-width: 800px) {
          padding: 12px;
        }

        &.media__plan-btn {
          border: none;
        
          @media (max-width: 800px) {
            border: 1px solid rgb(238, 38, 194);
            border-radius: 4px;
          }
        }

        &.reports__btn {
          border: none;

          @media (max-width: 800px) {
            border: 1px solid rgb(38, 118, 238);
            border-radius: 4px;
          }
        }
    
        .arrow-icon {
          width: 25px;
          height: 25px;
          transform: rotate(180deg);

          @media (max-width: 800px) {
            display: none;
          }
    
          &.active {
            transform: rotate(0);
          }
        }

        .checkmark-icon {
          display: none;

          @media (max-width: 800px) {
            display: flex;
            width: 25px;
            height: 25px;
          }
        }
      }

      .document__container, .items__document-wrapper {
        display: flex;
        flex-direction: column;
        width: 100%;
        gap: 8px;

        .items__document {
          display: flex;
          align-items: center;
          background: rgb(245, 245, 245);
          width: 100%;
          height: 42px;
          border-radius: 4px;
      
          .document__icon {
            width: 25px;
            height: 25px;
            margin: 0 10px;

            @media (max-width: 800px) {
              display: none;
            }
          }
      
          .document__title {
            color: rgb(0, 0, 0);
            font-size: 15px;
            font-weight: 400;
            line-height: 135%;
            letter-spacing: 0%;
            text-align: left;

            @media (max-width: 800px) {
              font-size: 12px;
              margin: 0 10px;
            }
          }
      
          .document__button {
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 42px;
            height: 100%;
            margin-left: auto;
            border: none;
            border-radius: 4px;

            &.refresh {background: rgb(148, 148, 148);}
            &.download {background: rgb(244, 212, 237);}
      
            img {
              width: 25px;
              height: 25px;
            }
          }
        }

        .document__warning {
          display: flex;
          align-items: center;
          width: 100%;
          gap: 5px;
          
          p {
            color: rgb(82, 82, 82);
            font-size: 12px;
            font-weight: 400;
            line-height: 135%;
            letter-spacing: 0%;
            text-align: left;

            @media (max-width: 800px) {
              font-size: 10px;
            }
          }
        }
      }

      .items__show-more {
        cursor: pointer;
        color: rgb(238, 38, 194);
        font-size: 15px;
        font-weight: 400;
        line-height: 18px;
        letter-spacing: 0%;
        text-align: left;
        margin-left: auto;
        border: none;
        background: none;
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