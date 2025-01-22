import { defineComponent, provide, Component } from 'vue'
import './style/group.scss'

export default defineComponent({
  name: 'AnyGroup',
  setup(props, { slots }) {
    const defaultSlots = slots.default()

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

    return () => <div class="any-group__content">{anyItemVNodes}</div>
  },
})
