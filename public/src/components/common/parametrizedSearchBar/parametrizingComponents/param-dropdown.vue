<template>
  <div>
    <b-form-select :options="additionalProps.options" :value="value" @change="emitChange" />
  </div>
</template>

<script>
/*
additionalProps: {options: [{text: 'text 1', value: 'value1'}, {text: 'text 2', value: 'value2'}, {text: 'text 3', value: 'value3'}]}
*/

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
