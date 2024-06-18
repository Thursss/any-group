import { defineComponent, useSlots, Component } from 'vue'
import './style/group.scss'

const AnyGroup = (props, children) => {
  const defaultSlots = children?.slots?.default?.()

  const anyItemVNodes = defaultSlots.filter((VN) => {
    const isItem = (VN.type as Component).name === 'AnyItem'
    if (!isItem)
      console.error(
        `${
          (VN.type as Component).name || (VN.type as string)
        } 不适用AnyGroup的子组件,请使用AnyItem组件包裹`,
      )

    return isItem
  })

  const { className, ...rest } = props

  return (
    <div className={`any-group ${className}`} {...rest}>
      {anyItemVNodes}
    </div>
  )
}

export default AnyGroup
