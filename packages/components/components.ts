import '@vue/runtime-core'
import * as Components from './src'

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    CeButton: typeof Components.CeButton
    CeCheckbox: typeof Components.CeCheckbox
    CeDepth: typeof Components.CeDepth
    CeGrid: typeof Components.CeGrid
    CeGridItem: typeof Components.CeGridItem
    CeIcon: typeof Components.CeIcon
    CeInput: typeof Components.CeInput
    CeLink: typeof Components.CeLink
    CeRadio: typeof Components.CeRadio
    CeScroll: typeof Components.CeScroll
    CeScrollOver: typeof Components.CeScrollOver
    CeSelect: typeof Components.CeSelect
    CeTable: typeof Components.CeTableBase
    CeText: typeof Components.CeText
    CeTextarea: typeof Components.CeTextarea
  }
}