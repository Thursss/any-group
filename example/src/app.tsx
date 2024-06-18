import { defineComponent } from 'vue'
import { AnyGroup, AnyItem } from '@/any'
import './app.scss'

const App = defineComponent({
  name: 'App',
  render() {
    return (
      <AnyGroup className="container">
        <AnyItem width={100}>11</AnyItem>
        <AnyItem width={100}>11</AnyItem>
        <AnyItem min={100}>11</AnyItem>
        <AnyItem width={500}>11</AnyItem>
      </AnyGroup>
    )
  },
})

export default App
