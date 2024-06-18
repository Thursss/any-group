import { ref } from 'vue'
import './style/item.scss'

type AnyItemPropType = {
  min?: number
  max?: number
  width?: number
  className?: string
}

const AnyItem = (props: AnyItemPropType, children) => {
  const defaultSlots = children?.slots?.default?.()
  const { className = '', min = 10, width, ...rest } = props

  const thisItem = ref<HTMLElement | undefined | null>()
  const resizeRef = ref<HTMLElement | undefined | null>()
  const nextItem = ref<HTMLElement | undefined | null>()

  const thisItemWidth = ref<number>()
  const nextItemWidth = ref<number>()
  const startX = ref(0)

  const onMouseup = () => {
    debugger
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseup', onMouseup)
  }
  const onMouseMove = (e: MouseEvent) => {
    e.preventDefault()
    const movepx = e.clientX - startX.value
    const tw = (thisItemWidth.value ?? 0) + movepx
    const nw = (nextItemWidth.value ?? 0) - movepx
    console.log(tw, nw)

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
  return (
    <div
      ref={thisItem}
      className={`any-item ${className}`}
      {...rest}
      style={{
        flex: width ? 'none' : 1,
        width: `${width}px`,
      }}
    >
      {defaultSlots}
      <div ref={resizeRef} class="resize" onMousedown={resizeMousedown}></div>
    </div>
  )
}

export default AnyItem
