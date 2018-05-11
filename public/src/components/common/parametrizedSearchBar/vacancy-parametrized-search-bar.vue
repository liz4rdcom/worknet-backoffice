<template>
  <div>
    <parametrized-search-bar :value="value" :paramCategoryList="paramCategoryList" @input="onInput"/>
  </div>
</template>

<script>
import ParametrizedSearchBar from './parametrized-search-bar'

export default {
  name: 'vacancy-parametrized-search-bar',
  props: ['value'],
  data () {
    return {
      paramCategoryList: [],
    }
  },
  methods: {
    onInput (val) {
      this.$emit('input', val)
    },
  },
  components: {
    'parametrized-search-bar': ParametrizedSearchBar,
  },
}
</script>

<style scoped>
</style>
