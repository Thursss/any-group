import { defineComponent } from 'vue'
import {
  AnyGroup,
  AnyItem,
  AnyKVList,
  AnyKVItem,
  AnyTooltip,
  AnyEllipsisTooltip,
} from '@/index'
import './app.scss'

export default defineComponent({
  name: 'App',
  render() {
    return (
      <div>
        <h1>AnyEllipsisTooltip</h1>
        <AnyEllipsisTooltip text='1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111' />
        <h1>AnyTooltip</h1>
        <div style="margin-left: 200px;width: 200px;">
          <AnyTooltip
            title="sss1111我师父11111ss1s"
            onOpenChange={(e) => console.log(e)}
          >
            {{
              // title: () => <div>xxxxxx</div>,
              default: () => (
                <div style="background: #ccc">sss1111我师父11111ss1s</div>
              ),
            }}
          </AnyTooltip>
        </div>
        <hr />
        <h1>AnyKVList</h1>
        <AnyKVList
          align="right"
          list={[
            {
              label: 'cs',
              value: 'csccccc',
            },
            {
              label: 'css111111sss',
              value:
                'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet expedita odio vel praesentium sed labore mollitia? Temporibus inventore perspiciatis cupiditate qui quisquam soluta similique vel, aut consectetur? Corrupti, veniam id',
            },
            {
              label: 'csssss',
              value:
                'Lorem ipsum dolor,mollitia? Temporibus inventore perspiciatis cupiditate qui quisquam soluta similique vel, aut consectetur? Corrupti, veniam id',
            },
            {
              label:
                'e mollitia? Temporibus inventore perspiciatis cupiditate qui quisquam soluta similiq',
              value:
                'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet expedita odio vel praesentium sed labore mollitia? Temporibus inventore perspiciatis cupiditate qui quisquam soluta similique vel, aut consectetur? Corrupti, veniam id',
            },
          ]}
        >
          <AnyKVItem>
            {{
              label: (info) => <div>{info?.label}</div>,
              default: (info) => <div>{info?.value}</div>,
            }}
          </AnyKVItem>
          <AnyKVItem>
            {{
              label: (info) => <div>{info?.label}</div>,
              default: (info) => <div>{info?.value}</div>,
            }}
          </AnyKVItem>
          <AnyKVItem>
            {{
              label: (info) => <div>{info?.label}</div>,
              default: (info) => <div>{info?.value}</div>,
            }}
          </AnyKVItem>
          <AnyKVItem>
            {{
              label: (info) => <div>{info?.label}</div>,
              default: (info) => <div>{info?.value}</div>,
            }}
          </AnyKVItem>
        </AnyKVList>
        <hr />
        <h1>AnyGroup</h1>
        <AnyGroup class="any-group">
          <AnyItem width={223}>111</AnyItem>
          <AnyItem width={100}>11</AnyItem>
          <AnyItem min={100} width={1023}>
            {{
              default: () => (
                <div class="default">
                  111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
                </div>
              ),
              resize: () => <div class="resize"></div>,
            }}
          </AnyItem>
          <AnyItem>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet
            expedita odio vel praesentium sed labore mollitia? Temporibus
            inventore perspiciatis cupiditate qui quisquam soluta similique vel,
            aut consectetur? Corrupti, veniam id!
          </AnyItem>
        </AnyGroup>
      </div>
    )
  },
})
