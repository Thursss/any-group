import { ref, defineComponent, PropType, inject, computed } from 'vue'

import './style/item.scss'

interface Props {
  gutter?: number | string
  label?: string
  align?: string
  width?: string
}

export default defineComponent({
  name: 'AnyKVItem',
  props: {
    gutter: [Number, String],
    label: String,
    align: String,
    width: String,
  },
  setup(props, { slots }) {
    const getRow = inject<any>('getRow')
    const row = getRow()

    const itemStyle = computed(() => ({
      width: props.width || row.value?.width,
    }))
    const labelStyle = computed(() => ({
      textAlign: props.align || row.value?.align,
      marginRight: props.gutter || row.value?.gutter + 'px',
    }))

    return () => (
      <div class="any-k-v-item" style={itemStyle.value}>
        <div class="any-k-v-item__label" style={labelStyle.value}>
          {slots.label?.(row.value.info) || props.label}
        </div>
        <div class="any-k-v-item__body">{slots.default?.(row.value.info)}</div>
      </div>
    )
  },
})
