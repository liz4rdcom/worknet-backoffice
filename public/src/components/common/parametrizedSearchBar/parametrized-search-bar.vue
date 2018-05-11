<template>
  <div>
    <b-modal
      id="parametersAddingModal"
      body-class="param-modal-body"
      title="პარამეტრები"
      header-bg-variant="info"
      header-text-variant="light"
      size="lg"
      hide-footer
      centered
    >
      <div class="separate-modal-columns">
        <div v-for="paramCategory in paramCategoryList" :key="paramCategory.id" class="modal-list-item">
          <b-row>
            <b-col cols="10">
              {{paramCategory.text}}
            </b-col>

            <b-col cols="2">
              <b-button variant="secondary" @click="addParamComp(paramCategory)">+</b-button>
            </b-col>
          </b-row>
        </div>
      </div>
    </b-modal>

    <b-row>
      <b-col cols="11">
        <b-card class="param-card">
          <div class="separate-param-columns">
            <div v-for="(paramComp, index) in value" :key="index" class="param-comp-lint-elem">
              <param-comp-enhancer @removeClick="removeParamComp(index)" v-model="paramComp.active">
                <component
                  :is="paramComp.name"
                  v-model="paramComp.value"
                  :hintText="paramComp.hintText"
                  :additionalProps="paramComp.additionalProps"
                />
              </param-comp-enhancer>
            </div>
          </div>
          <h1 v-if="value.length === 0" class="param-placeholder">პარამეტრები</h1>
        </b-card>
      </b-col>

      <b-col cols="1">
        <b-button variant="secondary" v-b-modal.parametersAddingModal>+</b-button>
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
  props: ['value', 'paramCategoryList'],
  data () {
    return {
      paramCompList: [],
    }
  },
  methods: {
    addParamComp ({id, text, paramCompName, additionalProps}) {
      const newVal = {
        id,
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
          newVal.value = {
            comparSign: null,
            dateVal: null,
          }
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

      this.$emit('input', [...this.value, newVal])
    },
    removeParamComp (index) {
      const valueCopy = [...this.value]

      valueCopy.splice(index, 1)

      this.$emit('input', valueCopy)
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

<style>
.param-card {
  height: 100%;
}
.separate-modal-columns {
  -moz-column-count: 2;
  -moz-column-gap: 20px;
  -webkit-column-count: 2;
  -webkit-column-gap: 20px;
  column-count: 2;
  column-gap: 20px;
}
.param-modal-body {
  height: 500px;
  overflow-y: auto;
}
.modal-list-item {
  padding: 5px;
}
.separate-param-columns {
  -moz-column-count: 2;
  -moz-column-gap: 20px;
  -webkit-column-count: 2;
  -webkit-column-gap: 20px;
  column-count: 2;
  column-gap: 20px;
}
.param-comp-lint-elem {
  display: inline-block;
}
.param-placeholder {
  opacity: 0.6;
}
</style>
