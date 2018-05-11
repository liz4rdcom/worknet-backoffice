<template>
  <div>
    <b-form-input
      :value="value"
      @input="emitChange"
      :placeholder="hintText"
      type="text"
    ></b-form-input>
  </div>
</template>

<script>
export default {
  name: 'param-input',
  props: ['value', 'hintText'],
  methods: {
    emitChange (val) {
      this.$emit('input', val)
    },
  },
}
</script>

<style scoped>
</style>
