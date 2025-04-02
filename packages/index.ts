import { App } from 'vue'
import { AnyGroup, AnyItem } from './any'
import { AnyKVList, AnyKVItem } from './k-v-list'

import './index.scss'

const components = { AnyGroup, AnyItem, AnyKVList, AnyKVItem }

const install = {
  install(app: App) {
    for (const name in components) {
      app.component(name, components[name])
    }
  },
}

export { AnyGroup, AnyItem, AnyKVList, AnyKVItem }
export default install
