import '@c/assets/table.scss'
import { StateType } from '@c/components/State'
import CeState from '@c/components/State/State.vue'
import CeTableHead from '@c/components/Table/CeTableHead.vue'
import CeTableRow from '@c/components/Table/CeTableRow.vue'
import { Resize } from '@c/hooks/resize'
import { createScrollBar } from '@c/hooks/scroll'
import { TableRows } from '@p/components/src'
import {
  computed,
  defineComponent,
  Fragment,
  h,
  isVNode,
  PropType,
  ref,
  Transition,
  VNode,
} from 'vue'

type borderString = 'top' | 'bottom' | 'left' | 'right' | 'row' | 'col'

export default defineComponent({
  name: 'CeTable',
  template: `
    <slot name="head"></slot>
    <slot name="default"></slot>
  `,
  props: {
    rows: {
      type: Object as PropType<TableRows>,
      required: true,
    },
    state: {
      type: String as PropType<StateType>,
    },
    loading: {
      type: Boolean as PropType<boolean>,
    },
    border: {
      type: [ String, Boolean, Array ] as PropType<boolean | borderString | string | borderString[]>,
    },
    stripe: {
      type: Boolean as PropType<boolean>,
    },
    width: {
      type: String,
    },
    height: {
      type: String,
    },
    maxHeight: {
      type: String,
    },
    fixedHead: {
      type: Boolean,
    },
  },
  setup(props, { slots }) {

    const mainEl = ref<HTMLElement | null>()
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

    const publicColumn = computed(() => {
      const { rows } = props
      const ps: any[] = rows.map(e => ({ ...e, className: 'ce-table-col-' + e.prop }))
      let hs: HTMLElement[] | undefined
      if(mainEl.value) {
        hs = Array.from(mainEl.value.querySelectorAll('thead>tr:first-child>th'))
      }
      let il = false, jl = false
      for(let /** 正序索引 */i = 0, /** 倒序索引 */j = ps.length - 1; j > -1; i++, j--) {
        const p = ps[i]
        const u = ps[j]
        // 计算粘性定位
        if(u.fixed === 'left') {
          il = true
          if(!ps[j + 1].fixed) u.className += ' ce-fixed-left-sign'
          u.className += ' ce-fixed-left'
        } else if(il) {
          u.fixed = 'left'
          u.className += ' ce-fixed-left'
        }
        if(p.fixed === 'right') {
          jl = true
          if(!rows![i - 1].fixed) p.className += ' ce-fixed-right-sign'
          p.className += ' ce-fixed-right'
        } else if(jl) {
          p.fixed = 'right'
          p.className += ' ce-fixed-right'
        }
      }
      let iw = 0, jw = 0
      for(let /** 正序索引 */i = 0, /** 倒序索引 */j = ps.length - 1; j > -1; i++, j--) {
        const p = ps[i]
        const u = ps[j]
        // 计算宽度
        if(hs) {
          p.width = hs[i].offsetWidth
          if(p.fixed === 'left') {
            p.style = `left:${ iw }px`
            iw += p.width
          }
          if(u.fixed === 'right') {
            u.style = `right:${ jw }px`
            jw += hs[j].offsetWidth
          }
        }
      }
      return ps
    })

    const borderClass = computed(() => {
      const { border } = props
      if(border === undefined || border === false) return []
      let bs
      if(border === true || border === '') {
        bs = [ 'top', 'bottom', 'left', 'right', 'row', 'col' ]
      } else if(typeof border === 'string') {
        bs = border.split(/, ?/)
      } else {
        bs = border
      }
      return bs.map(e => 'ce-table-border-' + e)
    })

    const rootClass = computed(() => {
      const base: any = {
        'ce-table-stripe': props.stripe,
        'ce-stick-top': showY.value && stateY.value !== 'start',
        'ce-stick-left': showX.value && stateX.value !== 'start',
        'ce-stick-right': showX.value && stateX.value !== 'end',
        'ce-fixe-head': props.fixedHead,
        // 'ce-table-empty': emptyData.value,
      }
      return base
    })

    const size = Resize.getRef(mainEl)

    return () => {
      const body: any[] = []
      const head: any[] = []
      if(slots.default) {
        const def = slots.default()
        const d = (v: VNode) => {
          if(v.type === CeTableHead) {
            if(v.props) {
              v.props.publicColumn = publicColumn.value
            } else {
              v.props = { publicColumn: publicColumn.value }
            }
            head.push(v)
            return
          }
          if(v.type === CeTableRow) {
            if(v.props) {
              v.props.publicColumn = publicColumn.value
            } else {
              v.props = { publicColumn: publicColumn.value }
            }
            body.push(v)
            return
          }
          if(v.type === Fragment) {
            if(!Array.isArray(v.children)) return
            for(let i = 0; i < v.children.length; i++) {
              const s = v.children[i]
              if(isVNode(s)) {
                d(s)
              }
            }
            return
          }
          body.push(v)
        }
        for(let i = 0; i < def.length; i++) {
          const s = def[i]
          if(isVNode(s)) {
            d(s)
          }
        }
      }

      if(head.length === 0) {
        head.push(h(CeTableHead, { publicColumn: publicColumn.value }))
      }
      return h(CeState, {
          class: [ rootClass.value, 'ce-table', 'ce-gap', ...borderClass.value ],
          style: {
            '--ce-table-width': props.width,
            '--ce-table-height': props.height,
            '--ce-table-max-height': props.maxHeight,
          },
          loading: props.loading,
        },
        {
          default: () =>
            [
              h('div', { class: 'ce-main ce-scroll-main', ref: mainEl }, [
                h('table', null, [
                  h('colgroup', null, publicColumn.value.map(e =>
                    h('col', { style: `width: ${ typeof e.width === 'string' ? e.width : e.width + 'px' }` })),
                  ),
                  h('thead', null, head),
                  h('tbody', null, body),
                ]),
                h(CeState, {
                  state: props.state,
                  class: 'ce-table-empty',
                  style: { width: size.width + 'px' },
                }),
              ]),
              h('div', { class: 'ce-line-left' }),
              h('div', { class: 'ce-line-right' }),
              h('div', { class: 'ce-line-top' }),
              h('div', { class: 'ce-line-bottom' }),
              h(Transition, { style: { display: showX.value ? '' : 'none' } }, {
                default: () =>
                  h('div', { class: 'ce-scroll-x-bar', ref: barXEl },
                    h('div', {
                      class: [ 'ce-scroll-x-thumb', { 'ce-active': downX.value } ],
                      ref: thumbXEl,
                    }),
                  ),
              }),
              h(Transition, { style: { display: showY.value ? '' : 'none' } }, {
                default: () =>
                  h('div', { class: 'ce-scroll-y-bar', ref: barYEl },
                    h('div', {
                      class: [ 'ce-scroll-y-thumb', { 'ce-active': downY.value } ],
                      ref: thumbYEl,
                    }),
                  ),
              }),
            ],
        })
    }
  },
})