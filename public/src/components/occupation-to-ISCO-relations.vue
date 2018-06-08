<template>
  <b-row class="occupation-to-ISCO-relations-container">
    <b-col class="relations-column" cols="3">
      <div class="relations-column-first-row">
        <button @click="onBoomClick">Boom</button>

        <!-- <b-btn
          v-b-popover.hover="'awbdouabw obawdb aobuwdouabw oubawodboawbdbou abw.'"
          variant="outline-primary"
          class="hint-element-class"
        >
          <b>?</b>
        </b-btn> -->

        <h5>
          დაუკავშირებელი
        </h5>
      </div>

      <div class="relations-column-second-row">
        <b-form-input type="text"></b-form-input>
      </div>

      <div class="relations-row-third-row relations-unrelated-card-list">
        <b-list-group>
          <b-list-group-item
            class="b-list-item-no-outline"
            v-for="(nextUnrelatedElem, nextUnrelatedElemIndex) in unrelatedList"
            :key="nextUnrelatedElem.name"
            :active="nextUnrelatedElemIndex === currentUnrelatedIndex"
            @click="onUnrelatedElemClick(nextUnrelatedElemIndex)"
            button
          >
            {{nextUnrelatedElem.name}}
          </b-list-group-item>
        </b-list-group>
      </div>

      <div class="selected-unrelated-occupation">
        {{currentUnrelatedIndex !== null ? unrelatedList[currentUnrelatedIndex].name : 'პოზიცია არ არის მონიშნული'}}
      </div>
    </b-col>

    <b-col class="relations-column" cols="3">
      <div class="relations-column-first-row">
        <h5>
          ISCO
        </h5>
      </div>

      <div class="relations-column-second-row">
        <b-form-input type="text"></b-form-input>
      </div>

      <div class="relations-row-third-row">
        <b-list-group>
          <b-list-group-item
            class="b-list-item-no-outline"
            style="overflow-x: hidden;"
            v-for="nextISCOElem in ISCOList"
            :key="nextISCOElem.id"
            @click="onISCOElemClick(nextISCOElem)"
            button
          >
            {{nextISCOElem.name}}
          </b-list-group-item>
        </b-list-group>
      </div>
    </b-col>

    <b-col class="relations-column" cols="3">
      <div class="relations-column-first-row">
        <h5>
          მიმდინარე&nbsp;ცვლილებები
        </h5>
      </div>

      <div class="relations-column-second-row">
        <b-button style="width: 100%;">ცვლილებების დადასტურება</b-button>
      </div>

      <div class="relations-row-third-row">
        <b-list-group>
          <b-list-group-item
            class="b-list-item-no-outline"
            style="overflow-x: hidden;"
            v-for="nextCurrChangesElem in currentChanges"
            :key="nextCurrChangesElem.occupationName"
            button
          >
            {{nextCurrChangesElem.occupationName}}
          </b-list-group-item>
        </b-list-group>
      </div>
    </b-col>

    <b-col class="relations-column" cols="3">
      <div class="relations-column-first-row">
        <h5>
          დაკავშირებული
        </h5>
      </div>

      <div class="relations-column-second-row">
        <b-form-input type="text"></b-form-input>
      </div>

      <div class="relations-row-third-row">
        <b-list-group>
          <b-list-group-item
            class="b-list-item-no-outline"
            style="overflow-x: hidden;"
            v-for="nextRelatedListElem in relatedList"
            :key="nextRelatedListElem.occupationName"
            button
          >
            {{nextRelatedListElem.occupationName}}
          </b-list-group-item>
        </b-list-group>
      </div>
    </b-col>
  </b-row>
</template>

<script>
import find from 'lodash/find'

export default {
  name: 'occupation-to-ISCO-relations',
  props: [],
  data () {
    return {
      unrelatedList: [],
      relatedList: [],
      ISCOList: [],
      currentChanges: [],
      currentUnrelatedIndex: null,
    }
  },
  async created () {
    this.unrelatedList = (await this.$http.get('/api/latestOccupationsToISCORelations/unrelatedList')).data

    this.relatedList = (await this.$http.get('/api/latestOccupationsToISCORelations/relatedList')).data

    this.ISCOList = (await this.$http.get('/api/libs/ISCOList')).data
  },
  methods: {
    async onBoomClick () {
      const result = await this.$http.get('/api/latestOccupationsToISCORelations/unrelatedList')

      const result2 = await this.$http.get('/api/latestOccupationsToISCORelations/relatedList')

      const result3 = await this.$http.get('/api/libs/ISCOList')

      console.log('boom: ', result.data, result2.data, result3.data)
    },
    onUnrelatedElemClick (index) {
      this.currentUnrelatedIndex = index
    },
    onISCOElemClick (clickedISCO) {
      if (this.currentUnrelatedIndex !== null) {
        const selectedUnrelatedListElem = this.unrelatedList[this.currentUnrelatedIndex]

        if (find(this.currentChanges, nextCurrChange => nextCurrChange.occupationName === selectedUnrelatedListElem.name) === undefined) {
          this.currentChanges.splice(0, 0, { occupationName: this.unrelatedList[this.currentUnrelatedIndex].name, ISCOId: clickedISCO.id })
        }
      }
    },
  },
  components: {},
}
</script>

<style scoped>
.occupation-to-ISCO-relations-container {
  margin-left: 0px;
  margin-right: 0px;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  height: 100%;
  overflow: auto;
}
.relations-column {
  /* min-width: min-content; */
  height: 100%;
  padding-left: 20px;
  padding-right: 20px;
  text-align: left;
}
.relations-column-first-row {
}
.relations-column-second-row {
  padding-bottom: 8px;
}
.relations-row-third-row {
  height: calc(100% - 78px);
  background: white;
  overflow-y: auto;
}
.relations-unrelated-card-list {
  margin-bottom: 8px;
  height: calc(100% - 157px);
}
.hint-element-class {
  border-radius: 50%;
  box-shadow: none !important;
  margin: 0px 5px 1px 0px;
}
.b-list-item-no-outline {
  outline: none;
}
.selected-unrelated-occupation {
  background: white;
  height: 70px;
  overflow: auto;
  font-weight: bold;
}
</style>
