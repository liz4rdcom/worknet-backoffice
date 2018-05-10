<template>
  <div class="parametrized-search-bar">
    <pre>{{
      JSON.stringify(paramCompList, null, 2)
    }}</pre>

    <b-modal
      id="parametersAddingModal"
      title="პარამეტრები"
      header-bg-variant="info"
      header-text-variant="light"
      hide-footer
      centered
    >
      <div v-for="paramCategory in paramCategoryList" :key="paramCategory.id">
        <b-row>
          <b-col cols="10">
            {{paramCategory.text}}
          </b-col>

          <b-col cols="2">
            <b-button variant="secondary" @click="addParamComp(paramCategory)">+</b-button>
          </b-col>
        </b-row>
      </div>
    </b-modal>

    <b-row>
      <b-col cols="5">
        <b-card title="პარამეტრები">
          <div v-for="(paramComp, index) in paramCompList" :key="index">
            <param-comp-enhancer @removeClick="removeParamComp(index)" v-model="paramComp.active">
              <component
                :is="paramComp.name"
                v-model="paramComp.value"
                :hintText="paramComp.hintText"
                :additionalProps="paramComp.additionalProps"
              />
            </param-comp-enhancer>
          </div>
        </b-card>
      </b-col>

      <b-col cols="5">
        <b-card title="დამატებითი პარამეტრები">bar</b-card>
      </b-col>

      <b-col cols="2">
        <b-button variant="secondary" v-b-modal.parametersAddingModal>+</b-button>

        <b-button variant="info">ძებნა</b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import paramCheckbox from './parametrizingComponents/param-checkbox'
import paramDate from './parametrizingComponents/param-date'
import paramDropdown from './parametrizingComponents/param-dropdown'
import paramInput from './parametrizingComponents/param-input'
import paramNumberInput from './parametrizingComponents/param-number-input'
import paramRangeInput from './parametrizingComponents/param-range-input'
import paramCompEnhancer from './param-comp-enhancer'

export default {
  name: 'parametrized-search-bar',
  props: ['paramCategoryList'],
  data () {
    return {
      paramCompList: [],
    }
  },
  methods: {
    addParamComp ({text, paramCompName, additionalProps}) {
      const newVal = {
        hintText: text,
        name: paramCompName,
        active: true,
        additionalProps,
      }

      switch (paramCompName) {
        case 'param-checkbox':
          newVal.value = true
          break
        case 'param-date':
          newVal.value = null
          break
        case 'param-dropdown':
          newVal.value = null
          break
        case 'param-input':
          newVal.value = ''
          break
        case 'param-number-input':
          newVal.value = {
            comparSign: null,
            numInput: null,
          }
          break
        case 'param-range-input':
          newVal.value = {
            startValue: null,
            endValue: null,
          }
          break
        default:
          return null
      }

      this.paramCompList.push(newVal)
    },
    removeParamComp (index) {
      const listCopy = [...this.paramCompList]

      listCopy.splice(index, 1)

      this.paramCompList = listCopy
    },
  },
  components: {
    'param-checkbox': paramCheckbox,
    'param-date': paramDate,
    'param-dropdown': paramDropdown,
    'param-input': paramInput,
    'param-number-input': paramNumberInput,
    'param-range-input': paramRangeInput,
    'param-comp-enhancer': paramCompEnhancer,
  },
}
</script>

<style scoped>
.parametrized-search-bar {
  padding: 10px;
}
</style>
