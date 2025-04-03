import {
  computed,
  defineComponent,
  nextTick,
  onMounted,
  ref,
  Teleport,
} from 'vue'
import './style/tooltip.scss'

export default defineComponent({
  name: 'AnyTooltip',
  props: {
    title: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: 'dark',
    },
  },
  setup(props, { slots }) {
    const defaultSlot = slots.default()

    const anyTooltipRef = ref<HTMLElement | null>(null)
    const anyTooltipClass = computed(() => `any-tooltip__body ${props.color}`)

    const open = ref(false)
    onMounted(() => {
      const target = defaultSlot[0].el as HTMLElement
      target.addEventListener('mouseenter', () => {
        const rect = target.getBoundingClientRect()
        target.className += ' any-tooltip__show'
        open.value = true

        nextTick(() => {
          anyTooltipRef.value.style.transform = `translate(${rect.left}px, ${rect.top}px)`
        })
      })
      target.addEventListener('mouseleave', () => {
        target.className = target.className.replace(' any-tooltip__show', '')
        open.value = false
      })
    })
    return () => {
      return (
        <>
          {defaultSlot}
          {
            <Teleport to="body">
              <div ref={anyTooltipRef} class={anyTooltipClass.value}>
                {slots.title?.() || props.title}
                <span className="el-popper__arrow"></span>
              </div>
            </Teleport>
          }
        </>
      )
    }
  },
})
