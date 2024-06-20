# 拖曳组件

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
<AnyGroup className="container">
  <AnyItem width={100}></AnyItem>
  <AnyItem width={100}></AnyItem>
  <AnyItem min={100}></AnyItem>
  <AnyItem width={500}></AnyItem>
</AnyGroup>
```
