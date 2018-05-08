<template>
  <div>
    <date-picker-dropdown :label="hintText" :value="value" @input="dateChanged" />
  </div>
</template>

<script>
import datePickerDropdown from '../../date-picker-dropdown'

export default {
  name: 'param-date',
  props: ['value', 'hintText'],
  methods: {
    dateChanged (val) {
      this.$emit('input', val)
    },
  },
  components: {
    'date-picker-dropdown': datePickerDropdown,
  },
}
</script>

<style scoped>
</style>
