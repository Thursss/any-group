import { App } from 'vue'
import group from './src/group.vue'
import item from './src/item.vue'

function install(app: App) {
  app.component('AnyGroup', group)
  app.component('AnyItem', item)
}

export default install
