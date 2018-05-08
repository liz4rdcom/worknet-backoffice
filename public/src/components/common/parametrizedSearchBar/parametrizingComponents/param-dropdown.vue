<template>
  <div>
    <b-form-select :options="additionalProps.options" :value="value" @change="emitChange" />
  </div>
</template>

<script>
export default {
  name: 'param-input',
  props: ['value', 'hintText', 'additionalProps'],
  methods: {
    emitChange (val) {
      this.$emit('input', val)
    },
  },
}
</script>

<style scoped>
</style>
