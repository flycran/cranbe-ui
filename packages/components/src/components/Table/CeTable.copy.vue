<script lang="ts" setup>
import CeIllustration from '@c/components/Illustration/CeIllustration.vue'
import { mountedWatch } from '@c/hooks'
import { createScrollBar } from '@c/hooks/scroll'
import { ScrollInfo, TableRow } from '@p/components/src'
import { computed, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'
import { TableRows } from './index'

type borderString = 'top' | 'bottom' | 'left' | 'right' | 'row' | 'col'

const p = defineProps<{
  data?: Record<string, any>[] | null
  rows?: TableRows
  border?: boolean | borderString | string | borderString[]
  keyName?: string | number | true
  stripe?: boolean
  width?: string
  height?: string
  maxHeight?: string
  fixedHead?: boolean
}>()
const emit = defineEmits<{
  (e: 'scroll', v: ScrollInfo): void

  (e: 'scrollX', v: ScrollInfo): void

  (e: 'scrollY', v: ScrollInfo): void
}>()

const borderClass = computed(() => {
  if(!p.border) return []
  let bs
  if(p.border === true) {
    bs = [ 'top', 'bottom', 'left', 'right', 'row', 'col' ]
  } else if(typeof p.border === 'string') {
    bs = p.border.split(/, ?/)
  } else {
    bs = p.border
  }
  return bs.map(e => 'ce-table-border-' + e)
})

const emptyData = computed(() => {
  return !p.data || !p.data.length
})

const mainEl = ref()
const thumbXEl = ref()
const thumbYEl = ref()
const barXEl = ref()
const barYEl = ref()
const sb = createScrollBar({
  mainEl,
  thumbXEl,
  thumbYEl,
  barXEl,
  barYEl,
})

const {
  scrollBarX: { state: stateX, show: showX, down: downX },
  scrollBarY: { state: stateY, show: showY, down: downY },
} = sb

const mw = ref(0)
const so = new ResizeObserver(() => {
  mw.value = mainEl.value.offsetWidth
})

const widths: any = reactive({})

let wh: any
const t_rootEl = ref()

const rwc = () => {
  if(!p.rows) return
  let sum = 0
  let ln = 0
  p.rows.forEach(e => {
    widths[e.prop] = e.width
    if(e.width) {
      sum += e.width
    } else {
      ln++
    }
  })
  if(ln) {
    const tw = t_rootEl.value.offsetWidth
    const f = (tw - sum) / ln
    for(const key in widths) {
      if(widths[key] === undefined) {
        widths[key] = f
      }
    }
  } else {
    if(!p.height) {

    }
  }
}

let wso = new ResizeObserver(rwc)

function stickPos(prop: TableRow) {
  if(!p.rows) return
  if(!prop.fixed) return ''
  let n = 0
  if(prop.fixed === 'left') {
    for(let i = 0; p.rows[i].prop !== prop.prop; i++) {
      if(p.rows[i].fixed) n += widths[p.rows[i].prop]
    }
    return `left: ${ n }px`
  } else if(prop.fixed === 'right') {
    for(let i = p.rows.length - 1; p.rows[i].prop !== prop.prop; i--) {
      if(p.rows[i].fixed) n += widths[p.rows[i].prop]
    }
    return `right: ${ n }px`
  }
}

onMounted(() => {
  so.observe(mainEl.value)
  wh = watch(() => p.rows, rwc, {
    immediate: true,
  })
  wso.observe(t_rootEl.value)
})
onBeforeUnmount(() => {
  so.unobserve(mainEl.value)
  wso.unobserve(t_rootEl.value)
  wh()
})

const rootClass = computed(() => {
  const base: any = {
    'ce-table-stripe': p.stripe,
    'ce-stick-top': stateY.value !== 'start',
    'ce-stick-left': stateX.value !== 'start',
    'ce-stick-right': stateX.value !== 'end',
    'ce-table-empty': emptyData.value,
    'ce-fixe-head': p.fixedHead,
  }
  borderClass.value.forEach(e => {
    base[e] = true
  })
  return base
})

const rootStyle = computed(() => ({
  '--ce-table-height': p.height,
  '--ce-table-max-height': p.maxHeight,
  '--ce-table-width': p.width,
}))

const colClass = (prop: TableRow, index: number) => {
  const c = [ 'ce-table-col-' + prop.prop ]
  if(prop.fixed) {
    c.push('ce-fixed-' + prop.fixed)
    if(prop.fixed === 'left' && !p.rows![index + 1].fixed) c.push('ce-fixed-left-sign')
    if(prop.fixed === 'right' && !p.rows![index - 1].fixed) c.push('ce-fixed-right-sign')
  }
  return c
}
</script>

<template>
  <div
      :class="rootClass"
      :style="rootStyle"
      class="ce-table ce-gap">
    <div ref="mainEl"
         class="ce-table-main ce-scroll-main">
      <div ref="t_rootEl" class="ce-table-root">
        <table>
          <slot>
            <colgroup>
              <col v-for="(prop) in (p.rows)" :key="prop.prop"
                   :class="'ce-table-col-' + prop.prop"
                   :style="{width: widths[prop.prop] + 'px'} ">
            </colgroup>
            <thead>
            <slot name="head">
              <tr ref="thrEl">
                <th v-for="(prop, index) in p.rows" :key="prop.prop"
                    :class="colClass(prop, index)"
                    :style="stickPos(prop)"
                    class="ce-table-col">
                  <slot :item="prop" :name="index + '-head'">
                    {{ prop.label }}
                  </slot>
                </th>
              </tr>
            </slot>
            </thead>
            <tbody>
            <slot name="body">
              <tr v-for="(row, index) in (p.data)"
                  :key="p.keyName ? (p.keyName === true? row : row[p.keyName]): index">
                <td v-for="(prop, propIndex) in p.rows"
                    :key="prop.prop"
                    :class="colClass(prop, propIndex)"
                    :style="stickPos(prop)"
                    class="ce-table-col">
                  <slot :name="prop.prop" :prop="prop.prop" :row="row">
                    {{ prop.getter ? prop.getter(row) : row[prop.prop] }}
                  </slot>
                </td>
              </tr>
            </slot>
            </tbody>
          </slot>
        </table>
        <div v-show="emptyData" :style="{width: mw + 'px'}" class="table-empty">
          <slot name="empty">
            <CeIllustration type="empty"/>
          </slot>
        </div>
      </div>
    </div>
    <div class="ce-line-left"></div>
    <div class="ce-line-right"></div>
    <div class="ce-line-bottom"></div>
    <!-- 滚动条 -->
    <transition>
      <div v-show="showY" ref="barYEl" class="ce-scroll-y-bar">
        <div ref="thumbYEl" :class="{'ce-active': downY}" class="ce-scroll-y-thumb"></div>
      </div>
    </transition>
    <transition>
      <div v-show="showX" ref="barXEl" class="ce-scroll-x-bar">
        <div ref="thumbXEl" :class="{'ce-active': downX}" class="ce-scroll-x-thumb"></div>
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.ce-table {
  position: relative;
  display: flex;
  flex-direction: column;
  // 自定义变量
  --ce-table-height: none;
  --ce-table-max-height: none;
  --ce-table-width: none;

  .ce-table-main {
    overflow: scroll;
    height: var(--ce-table-height);
    max-height: var(--ce-table-max-height);

    .ce-table-root {
      display: flex;
      flex-direction: column;
      width: var(--ce-table-width);
      position: relative;

      table {
        width: 100%;
        border-collapse: separate;
        border-spacing: 0;
      }
    }
  }

  // 滚动
  .ce-scroll-x-bar, .ce-scroll-y-bar {
    background-color: transparent;
    opacity: 0.8;
  }

  // 列公共
  tbody, thead {
    tr {
      width: 100%;
      transition: background-color var(--ce-transition-duration);
      background-color: #fff;

      td, th {
        padding: 10px;
        background-color: inherit;
      }
    }
  }

  // 粘性定位
  thead {
    position: relative;
    z-index: 3;
  }

  &.ce-fixe-head {
    thead {
      position: sticky;
      top: 0;
    }

    &.ce-stick-top {
      thead::before {
        content: "";
        display: block;
        position: absolute;
        left: 0;
        bottom: -8px;
        width: 100%;
        height: 8px;
        box-shadow: var(--ce-floating-shadow-color) 0 10px 10px -10px inset;
      }
    }
  }

  thead, tbody tr {
    .ce-fixed-left, .ce-fixed-right {
      position: sticky;
    }
  }

  &.ce-stick-left tr .ce-fixed-left-sign::before {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    right: -8px;
    width: 8px;
    height: 100%;
    box-shadow: var(--ce-floating-shadow-color) 10px 0 10px -10px inset;
  }

  &.ce-stick-right tr .ce-fixed-right-sign::before {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: -8px;
    width: 8px;
    height: 100%;
    box-shadow: var(--ce-floating-shadow-color) -10px 0px 10px -10px inset;
  }

  // 粘性定位兼容边框
  &.ce-table-border-col.ce-stick-right .ce-fixed-right-sign {
    border-left: none;
  }

  &.ce-table-border-row.ce-stick-top {
    thead tr:last-child th {
      border-bottom: var(--ce-table-border);
    }
  }

  // 阴影兼容边框
  &.ce-table-fixe-first, &.ce-table-fixe-last {
    &.ce-stick-left, &.ce-stick-right {
      &.ce-table-border-row {
        thead tr:nth-child(n+2) th::before {
          height: calc(100% + var(--ce-table-border-width));
          top: calc(var(--ce-table-border-width) * -1);
        }

        tbody tr td::before {
          height: calc(100% + var(--ce-table-border-width));
          top: calc(var(--ce-table-border-width) * -1);
        }
      }
    }
  }

  tbody {
    tr:hover {
      background-color: var(--ce-table-background-active);
    }
  }

  &.ce-table-stripe {
    thead {
      tr:first-child {
        background-color: var(--ce-table-background-even);
      }
    }

    tbody {
      tr {

        &:nth-child(even) {
          background-color: var(--ce-table-background-even);
        }

        &:nth-child(odd) {
          background-color: var(--ce-table-background-odd);
        }

      }
    }
  }

  // 边框
  &.ce-table-border-row {
    tr:nth-child(n+2) th {
      border-top: var(--ce-table-border);
    }

    tr td {
      border-top: var(--ce-table-border);
    }
  }

  &.ce-table-border-col {
    tr {
      th, td {
        &:nth-child(n+2) {
          border-left: var(--ce-table-border);
        }
      }
    }
  }

  &.ce-table-border-top {
    thead tr:first-child {
      th {
        border-top: var(--ce-table-border);
      }
    }
  }

  &.ce-table-border-bottom {
    tbody tr:last-child {
      td, th {
        border-bottom: var(--ce-table-border);
      }
    }

    .ce-line-bottom {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      border-bottom: var(--ce-table-border);
    }
  }

  &.ce-table-border-left {
    tr {
      td, th {
        &:last-child {
          border-left: var(--ce-table-border);
        }
      }
    }

    .ce-line-left {
      position: absolute;
      height: 100%;
      left: 0;
      top: 0;
      z-index: 10;
      border-left: var(--ce-table-border);
    }
  }

  &.ce-table-border-right {
    tr {
      td, th {
        &:last-child {
          border-right: var(--ce-table-border);
        }
      }
    }

    .ce-line-right {
      position: absolute;
      height: 100%;
      right: 0;
      top: 0;
      z-index: 10;
      border-right: var(--ce-table-border);
    }
  }

  &.ce-table-empty {
    .ce-table-root {
      height: var(--ce-table-height);
    }
  }

  //空数据
  .table-empty {
    box-sizing: border-box;
    position: sticky;
    left: 0;
    flex: 1;
    height: 0;
    flex-shrink: 0;

    .ce-illustration {
      height: 100%;
      margin: 0 auto;
    }
  }

  // 空数据兼容边框
  &.ce-table-empty.ce-table-border-bottom {
    thead {
      tr:last-child th {
        border-bottom: var(--ce-table-border);
      }
    }
  }

  .ce-table-border-left {
    .table-empty {
      //border-left: var(--ce-table-border);
    }
  }

  .ce-table-border-right {
    .table-empty {
      //border-right: var(--ce-table-border);
    }
  }

  .ce-table-border-bottom {
    .table-empty {
      border-bottom: var(--ce-table-border);
    }
  }

}
</style>

<script lang="ts">
export default { name: 'CeTable' }
</script>