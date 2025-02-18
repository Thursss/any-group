# 容器组件

## 安装

```shell
npm i any-group -S
```

## 快速开始

```javascript
import Any from 'any-group'
Vue.use(Any)
// or
按需引用
import { AnyGroup, AnyItem } from 'any-group'
```
--- 

### AnyGroup
```javascript
<AnyGroup className="container">
  <AnyItem width={100}></AnyItem>
  <AnyItem width={100}></AnyItem>
  <AnyItem min={100}></AnyItem>
  <AnyItem width={500}></AnyItem>
</AnyGroup>
```

### AnyKVList
```javascript
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
```