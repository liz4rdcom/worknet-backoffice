<template>
  <div>
    <slot />

    <b-form-checkbox
      :checked="value"
      @change="emitChange"
      :value="true"
      :unchecked-value="false"
      variant="info"
    />

    <b-button variant="danger" @click="removeClick">-</b-button>
  </div>
</template>

<script>
export default {
  name: 'param-comp-enhancer',
  props: ['value'],
  data () {
    return {}
  },
  methods: {
    removeClick () {
      this.$emit('removeClick')
    },
    emitChange (val) {
      this.$emit('input', val)
    },
  },
  components: {
  },
}
</script>

<style scoped>
</style>
