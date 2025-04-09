import { App } from 'vue'
import { AnyGroup, AnyItem } from './any'
import { AnyKVList, AnyKVItem } from './k-v-list'
import { AnyTooltip } from './tooltip'
import { AnyEllipsisTooltip } from './ellipsis-tooltip'

import './_style/index.scss'

const components = {
  AnyGroup,
  AnyItem,
  AnyKVList,
  AnyKVItem,
  AnyTooltip,
  AnyEllipsisTooltip,
}

const install = {
  install(app: App) {
    for (const name in components) {
      app.component(name, components[name])
    }
  },
}

export {
  AnyGroup,
  AnyItem,
  AnyKVList,
  AnyKVItem,
  AnyTooltip,
  AnyEllipsisTooltip,
}
export default install
