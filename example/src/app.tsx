import { defineComponent } from 'vue'
import { AnyGroup, AnyItem } from '@/index'
import './app.scss'

export default defineComponent({
  name: 'App',
  render() {
    return (
      <div>
        <AnyGroup class="any-group">
          <AnyItem width={223}>111</AnyItem>
          <AnyItem width={100}>11</AnyItem>
          <AnyItem min={100} width={1023}>
            {{
              default: () => <div class="default">111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111</div>,
              resize: () => <div class="resize"></div>,
            }}
          </AnyItem>
          <AnyItem>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet expedita odio vel praesentium sed labore mollitia? Temporibus inventore perspiciatis cupiditate qui quisquam soluta similique vel, aut consectetur? Corrupti, veniam id!</AnyItem>
        </AnyGroup>
      </div>
    )
  },
})
