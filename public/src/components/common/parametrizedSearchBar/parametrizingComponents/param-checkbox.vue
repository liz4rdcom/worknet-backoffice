<template>
  <div>
    <b-form-checkbox
      :checked="value"
      @change="emitChange"
      :value="true"
      :unchecked-value="false"
      variant="info"
    >
      {{hintText}}
    </b-form-checkbox>
  </div>
</template>

<script>
export default {
  name: 'param-checkbox',
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
