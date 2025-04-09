import {
  computed,
  defineComponent,
  nextTick,
  onMounted,
  ref,
  Teleport,
  watchEffect,
  PropType,
} from 'vue'
import './style/tooltip.scss'

export default defineComponent({
  name: 'AnyTooltip',
  props: {
    title: {
      type: String,
      default: '',
    },
    placement: {
      type: String as PropType<
        | 'top'
        | 'left'
        | 'right'
        | 'bottom'
        | 'topLeft'
        | 'topRight'
        | 'bottomLeft'
        | 'bottomRight'
        | 'leftTop'
        | 'leftBottom'
        | 'rightTop'
        | 'rightBottom'
      >,
      default: 'top',
    },
    color: {
      type: String as PropType<'dark' | 'light'>,
      default: 'dark',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['openChange'],
  setup(props, { slots, emit }) {
    const defaultSlot = slots.default()
    const anyTooltipRef = ref<HTMLElement | null>(null)
    const anyTooltipClass = computed(
      () => `any-tooltip__body ${props.color} ${props.placement}`,
    )

    const timer = ref()

    const open = ref(false)
    onMounted(() => {
      const target = defaultSlot[0].el
      target.addEventListener('mouseenter', () => {
        // 禁用时不执行
        if (props.disabled) return

        const rect = target.getBoundingClientRect()
        target.className += ' any-tooltip__show'
        clearTimeout(timer.value)
        open.value = true
        nextTick(() => {
          const anyTooltipRect = anyTooltipRef.value.getBoundingClientRect()
          if (props.placement === 'top') {
            anyTooltipRef.value.style.left = `${
              rect.left + rect.width / 2 - anyTooltipRect.width / 2
            }px`
            anyTooltipRef.value.style.top = `${
              rect.top - anyTooltipRect.height - 10
            }px`
            return
          }
          if (props.placement === 'bottom') {
            anyTooltipRef.value.style.left = `${
              rect.left + rect.width / 2 - anyTooltipRect.width / 2
            }px`
            anyTooltipRef.value.style.top = `${rect.bottom + 10}px`
            return
          }
          if (props.placement === 'left') {
            anyTooltipRef.value.style.left = `${
              rect.left - anyTooltipRect.width - 10
            }px`
            anyTooltipRef.value.style.top = `${
              rect.top + rect.height / 2 - anyTooltipRect.height / 2
            }px`
            return
          }
          if (props.placement === 'right') {
            anyTooltipRef.value.style.left = `${rect.right + 10}px`
            anyTooltipRef.value.style.top = `${
              rect.top + rect.height / 2 - anyTooltipRect.height / 2
            }px`
            return
          }
        })
      })
      target.addEventListener('mouseleave', () => {
        target.className = target.className.replace(' any-tooltip__show', '')
        timer.value = setTimeout(() => {
          open.value = false
        }, 150)
      })
    })
    watchEffect(() => {
      emit('openChange', open.value)
    })

    const showTooltip = () => {
      const target = defaultSlot[0].el
      target.className += ' any-tooltip__show'
      clearTimeout(timer.value)
      open.value = true
    }
    const closeTooltip = () => {
      const target = defaultSlot[0].el
      target.className = target.className.replace(' any-tooltip__show', '')
      timer.value = setTimeout(() => {
        open.value = false
      }, 150)
    }

    return () => {
      return (
        <>
          {defaultSlot}
          {
            <Teleport to="body">
              {open.value && !props.disabled && (
                <div
                  ref={anyTooltipRef}
                  class={anyTooltipClass.value}
                  onMouseenter={showTooltip}
                  onMouseleave={closeTooltip}
                >
                  {slots.title?.() || (
                    <div class="any-tooltip__content">{props.title}</div>
                  )}
                  <span className="any-tooltip__arrow"></span>
                </div>
              )}
            </Teleport>
          }
        </>
      )
    }
  },
})
