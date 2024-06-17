import { App } from 'vue'
import { AnyGroup, AnyItem } from '@/any'

const components = { AnyGroup, AnyItem }

const install = {
  install(app: App) {
    for (const name in components) {
      app.component(name, components[name])
    }
  },
}

export { AnyGroup, AnyItem }
export default install
