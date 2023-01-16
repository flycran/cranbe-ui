import { App } from 'vue'
// import '../components'
import Button from './components/Button'
import Checkbox from './components/Checkbox'
import Depth from './components/Depth'
import Grid from './components/Grid'
import Icon from './components/Icon'
import Input from './components/Input'
import Link from './components/Link'
import Radio from './components/Radio'
import Scroll from './components/Scroll'
import Select from './components/Select'
import Table from './components/Table'
import Text from './components/Text'
import Textarea from './components/Textarea'
import directive from './directive'

export {
  Button,
  Checkbox,
  Depth,
  Grid,
  Icon,
  Input,
  Link,
  Radio,
  Scroll,
  Select,
  Table,
  Text,
  Textarea,
  directive,
}

export * from './components/Button'
export * from './components/Checkbox'
export * from './components/Depth'
export * from './components/Grid'
export * from './components/Icon'
export * from './components/Input'
export * from './components/Link'
export * from './components/Input'
export * from './components/Radio'
export * from './components/Scroll'
export * from './components/Select'
export * from './components/Table'
export * from './components/Text'
export * from './components/Textarea'

const CranbeUi = {
  install(Vue: App) {
    Vue.use(directive)
    Vue.use(Button)
    Vue.use(Input)
    Vue.use(Grid)
    Vue.use(Link)
    Vue.use(Icon)
    Vue.use(Table)
    Vue.use(Depth)
    Vue.use(Scroll)
    Vue.use(Text)
    Vue.use(Textarea)
    Vue.use(Checkbox)
    Vue.use(Select)
    Vue.use(Radio)
  },
}

export default CranbeUi
export type { TableRow, TableRows } from './components/Table/index'
export type { ScrollInfo, ScrollState } from './components/Scroll'

export interface IconType {
  search: any
  filter: any
  delete: any
  plus: any
  reset: any
  circular: any
}

export type IconTypeString = keyof IconType | string