import { defineComponent } from 'vue'
import { AnyGroup, AnyItem } from '@/any'

const App = defineComponent({
  name: 'App',
  render() {
    return (
      <div className="app-container">
        <AnyGroup>
          <AnyItem />
        </AnyGroup>
      </div>
    )
  },
})

export default App
