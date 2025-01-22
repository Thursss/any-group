import { ref, defineComponent } from 'vue'
import './style/item.scss'

export default defineComponent({
  name: 'AnyItem',
  props: {
    min: {
      type: Number,
      default: 10,
    },
    max: {
      type: Number,
      default: 100,
    },
    width: {
      type: Number,
    },
  },
  setup(props, { slots }) {
    // 获取默认插槽
    const defaultSlots = slots?.default?.()
    const resizeSlots = slots?.resize?.()

    // 获取props
    const { min = 10, width } = props

    // 定义ref变量
    const thisItem = ref<HTMLElement | undefined | null>()
    const resizeRef = ref<HTMLElement | undefined | null>()
    const nextItem = ref<HTMLElement | undefined | null>()

    const thisItemWidth = ref<number>()
    const nextItemWidth = ref<number>()
    const startX = ref(0)

    const onMouseup = () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseup)
    }
    const onMouseMove = (e: MouseEvent) => {
      e.preventDefault()
      const movepx = e.clientX - startX.value
      const tw = (thisItemWidth.value ?? 0) + movepx
      const nw = (nextItemWidth.value ?? 0) - movepx

      if (tw <= min || nw <= 10) return

      thisItem.value!.style.width = tw + 'px'
      thisItem.value!.style.flex = 'none'
      nextItem.value!.style.width = nw + 'px'
      nextItem.value!.style.flex = 'none'
    }

    const resizeMousedown = (e: MouseEvent) => {
      nextItem.value = thisItem.value?.nextElementSibling as HTMLElement
      if (!nextItem) return
      thisItemWidth.value = thisItem.value?.clientWidth
      nextItemWidth.value = nextItem.value?.clientWidth
      // 颜色改变提醒
      startX.value = e.clientX

      document.addEventListener('mousemove', onMouseMove)
      document.addEventListener('mouseup', onMouseup)
    }
    return () => (
      <div
        ref={thisItem}
        class="any-scrollbar-bar any-item__content"
        style={{
          flex: width ? 'none' : 1,
          width: `${width}px`,
        }}
      >
        {defaultSlots}
        <div class="any-item__resize" onMousedown={resizeMousedown}>
          {resizeSlots || <div className="any-item__resize-body"></div>}
        </div>
      </div>
    )
  },
})
