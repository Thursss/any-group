import {
  defineComponent,
  onMounted,
  onUnmounted,
  ref,
} from 'vue'
import { AnyTooltip } from '../../tooltip/'
import './ellipsis-tooltip.scss'

export default defineComponent({
  name: 'AnyEllipsisTooltip',
  props: {
    text: {
      type: String,
      default: '',
    },
    width: {
      type: String,
    },
    maxWidth: {
      type: String,
    },
  },
  setup(props) {
    const container = ref<Element>()
    const disabled = ref(false)

    const updateOverflow = () => {
      requestAnimationFrame(() => {
        if (container.value) {
          const isOverflow =
            container.value.scrollWidth > container.value.clientWidth
          disabled.value = !isOverflow

          console.log('updateOverflow', disabled.value)
        }
      })
    }

    const resizeObserver = new ResizeObserver(updateOverflow)
    const mutationObserver = new MutationObserver(updateOverflow)

    onMounted(() => {
      if (container.value) {
        resizeObserver.observe(container.value)
        mutationObserver.observe(container.value, {
          childList: true,
          subtree: true,
          characterData: true,
        })
      }
    })
    onUnmounted(() => {
      resizeObserver.disconnect()
      mutationObserver.disconnect()
    })

    return () => (
      <AnyTooltip title={props.text} disabled={disabled.value}>
        {{
          default: () => (
            <p
              ref={container}
              class="any-ellipsis-tooltip__text"
              style={`width: ${props.width}, maxWidth: ${props.maxWidth}`}
            >
              {props.text}
            </p>
          ),
        }}
      </AnyTooltip>
    )
  },
})
