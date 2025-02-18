import {
  ref,
  defineComponent,
  PropType,
  provide,
  toRef,
  watch,
  onMounted,
  onUnmounted,
} from 'vue'

import './style/list.scss'

interface Props {
  gutter?: number | string
  align?: string
  width?: string
  list?: any[]
}

export default defineComponent({
  name: 'AnyKVList',
  props: {
    gutter: {
      type: [Number, String] as PropType<number | string>,
      default: 10,
    },
    align: {
      type: String,
      default: 'left',
    },
    width: {
      type: String,
      default: '100%',
    },
    list: Array,
  },
  setup(props, { slots }) {
    // 提供参数
    let i = -1
    provide('getRow', () => {
      i++
      return toRef({
        info: props.list?.[i] || {},
        ...props,
      })
    })

    const maxWidth = ref(0)
    const groupEle = ref<HTMLElement | null>(null)
    // 获取所有类名为 cat-k-v-item 的元素
    let itemElements = document.querySelectorAll('.any-k-v-item')

    const resetWidth = () => {
      if (itemElements) {
        // 遍历元素，计算最大宽度
        itemElements.forEach((item) => {
          const label = item.querySelector('.any-k-v-item__label')
          if (label) {
            const width = label.clientWidth

            console.log('width: ', width, 'maxWidth: ', maxWidth.value)

            if (width > maxWidth.value) {
              maxWidth.value = width
            }
          }
        })

        // 设置所有类名为 cat-k-v-list__label 的元素的宽度
        itemElements.forEach((item) => {
          const label: HTMLElement = item.querySelector('.any-k-v-item__label')
          if (label) {
            label.style.width = `${maxWidth.value}px`
          }
        })
      }
    }
    const observer = new ResizeObserver(() => {
      resetWidth()
    })

    onMounted(() => {
      if (!groupEle.value) return
      itemElements = document.querySelectorAll('.any-k-v-item')
      observer.observe(groupEle.value)
      resetWidth()
    })
    watch(
      () => props.list,
      () => {
        resetWidth()
      },
      {
        deep: true,
      },
    )
    onUnmounted(() => {
      observer.disconnect()
    })

    return () => (
      <div ref={groupEle} class="any-k-v-list">
        {slots.default()}
      </div>
    )
  },
})
