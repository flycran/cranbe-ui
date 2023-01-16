<script lang="ts" setup>
import { StateType } from '@c/components/State'
import CeState from '@c/components/State/State.vue'
import CeBubble from '@c/components/Tool/CeBubble.vue'
import { CallBack, InteriorEach } from '@c/hooks/interiorEach'
import { createScrollBarY } from '@c/hooks/scroll'
import { findParent } from '@p/utils'
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'

const p = defineProps<{
  options?: any[]
  keyName?: string | number | true
  getter?: CallBack
  setter?: CallBack
  proxy?: CallBack
  find?: CallBack
  select: CallBack
  show?: boolean
  loading?: boolean
  state?: StateType
}>()
const emit = defineEmits<{
  // (e: 'update:show', v: boolean): void
}>()

const ie = new InteriorEach(p)

// 滚动条
const optionMainEl = ref<HTMLElement>()
const bar = ref<HTMLElement>()
const thumb = ref<HTMLElement>()

const { show, down, mount, unmount } = createScrollBarY()

onMounted(() => {
  mount({
    main: optionMainEl.value!,
    bar: bar.value!,
    thumb: thumb.value!,
  })
})

onBeforeUnmount(() => {
  unmount()
})

// 按键锁定
const activeIndex = ref(0)
const activeShow = ref(false)

const mouseenter = (index: number) => {
  activeIndex.value = index
  activeShow.value = false
}

const scrollIntoView = () => {
  activeShow.value = true
  const activeEl = optionMainEl.value!.children[activeIndex.value]
  window.requestAnimationFrame(() => {
    activeEl.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    })
  })
}

watch(() => p.show, (v) => {
  if(!v) {
    activeIndex.value = 0
    activeShow.value = false
  }
})

const keydown = (e: KeyboardEvent) => {
  if(!show || !p.options || !p.options.length) return
  switch(e.key) {
    case 'ArrowDown': {
      if(activeIndex.value >= p.options.length - 1) activeIndex.value = 0
      else activeIndex.value++
      scrollIntoView()
      break
    }
    case 'ArrowUp': {
      if(activeIndex.value <= 0) activeIndex.value = p.options.length - 1
      else activeIndex.value--
      scrollIntoView()
      break
    }
    case 'Enter': {
      p.select(ie.setter(p.options[activeIndex.value]))
      break
    }
  }
}

const rootEl = ref()
let tabElement: HTMLElement | false

onMounted(() => {
  tabElement = findParent(rootEl.value.$el, e => e.tabIndex !== -1)
  if(!tabElement) return
  tabElement.addEventListener('keydown', keydown)
})

onBeforeUnmount(() => {
  if(!tabElement) return
  tabElement.removeEventListener('keydown', keydown)
})

const empty = computed(() => !p.options || !p.options.length)
</script>

<template>
  <CeBubble v-show="p.show" ref="rootEl" class="ce-input-suggest ce-gap">
    <CeState :loading="loading" :state="empty ? 'empty' : state">
      <div ref="optionMainEl" class="ce-option-main ce-scroll-main">
        <template v-if="options">
          <div v-for="(item, index) in options"
               :key="keyName ? (keyName === true? item : item[keyName]): index"
               :class="{'ce-active': activeShow && activeIndex === index}"
               class="ce-option"
               @click="select(ie.setter(item))"
               @mouseenter="mouseenter(index)">
            <slot :index="index" :item="item">
              <div class="ce-slot-option">
                {{ ie.getter(item) }}
              </div>
            </slot>
          </div>
        </template>
      </div>
      <transition>
        <div v-show="show" ref="bar" class="ce-scroll-y-bar">
          <div ref="thumb" :class="{'ce-active': down}" class="ce-scroll-y-thumb"></div>
        </div>
      </transition>
    </CeState>
  </CeBubble>
</template>

<style lang="scss" scoped>
.ce-input-suggest {
  user-select: none;
  --ce-padding: 6px 0;
  --ce-max-height: 300px;

  .ce-option-main {
    padding: var(--ce-padding);
    max-height: var(--ce-max-height);
  }

  .ce-option {
    .ce-state {
      background-color: var(--ce-background);
      transition: background-color var(--ce-transition-duration);
    }

    &:hover, &.ce-active {
      background-color: var(--ce-select-background-active);
    }

    .ce-slot-option {
      padding: var(--ce-input-padding) calc(var(--ce-input-padding) * 2);
    }
  }

  .ce-illustration {
    width: 100%;
  }
}
</style>
<script lang="ts">
export default { name: 'CeInputSuggest' }
</script>