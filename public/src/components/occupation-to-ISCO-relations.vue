<template>
  <b-row class="occupation-to-ISCO-relations-container">
    <b-col class="relations-column" cols="3">
      <div class="relations-column-first-row">
        <!-- <button @click="onBoomClick">Boom</button> -->

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
        <b-form-input type="text" v-model="unrelatedFilterInput"></b-form-input>
      </div>

      <div class="relations-row-third-row relations-unrelated-card-list">
        <b-list-group>
          <b-list-group-item
            class="b-list-item-no-outline"
            v-for="(nextUnrelatedElem, nextUnrelatedElemIndex) in filteredUnrelatedList"
            :key="nextUnrelatedElem.name"
            :active="nextUnrelatedElemIndex === currentUnrelatedIndex"
            :disabled="isInCurrentChanges(nextUnrelatedElem.name)"
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
        <b-form-input type="text" v-model="ISCOFilterInput" :placeholder="`მინიმუმ ${minimumLengthOfFilterText} სიმბოლო`"></b-form-input>
      </div>

      <div class="relations-row-third-row">
        <h6 v-if="filteredISCOList.length === 0 && ISCOFilterInput.length >= minimumLengthOfFilterText">არ მოიძებნა.</h6>

        <b-list-group v-if="filteredISCOList.length > 0">
          <b-list-group-item
            class="b-list-item-no-outline"
            style="overflow-x: hidden;"
            v-for="nextISCOElem in filteredISCOList"
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
        <b-button style="width: 100%;" @click="onSaveChanges">ცვლილებების დადასტურება</b-button>
      </div>

      <div class="relations-row-third-row">
        <b-list-group>
          <b-list-group-item
            class="b-list-item-no-outline"
            style="overflow-x: hidden; padding: 3px;"
            v-for="(nextCurrChangesElem, nextCurrChangesElemIndex) in currentChanges"
            :key="nextCurrChangesElem.occupationName"
          >
            <b-container class="bv-example-row">
              <b-row>
                <b-col>
                  <i>
                    {{nextCurrChangesElem.occupationName}}
                  </i>
                  {{' - '}}
                  <b>
                    {{getISCONameById(nextCurrChangesElem.ISCOId)}}
                  </b>
                </b-col>

                <b-col cols="auto">
                  <b-button variant="danger" @click="onRemoveCurrentChangeClick(nextCurrChangesElemIndex)">X</b-button>
                </b-col>
              </b-row>
            </b-container>
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
        <b-form-input type="text" v-model="relatedFilterInput"></b-form-input>
      </div>

      <div class="relations-row-third-row">
        <b-list-group>
          <b-list-group-item
            class="b-list-item-no-outline"
            style="overflow-x: hidden;"
            v-for="nextRelatedListElem in filteredRelatedList"
            :key="nextRelatedListElem.occupationName"
          >
            <b-container class="bv-example-row">
              <b-row>
                <b-col>
                  <i>
                    {{nextRelatedListElem.occupationName}}
                  </i>
                  {{' - '}}
                  <b>
                    {{getISCONameById(nextRelatedListElem.ISCOId)}}
                  </b>
                </b-col>

                <b-col cols="auto">
                  <b-button variant="danger" @click="onRemoveRelatedListClick(nextRelatedListElem.occupationName)">X</b-button>
                </b-col>
              </b-row>
            </b-container>
          </b-list-group-item>
        </b-list-group>
      </div>
    </b-col>
  </b-row>
</template>

<script>
import find from 'lodash/find'
import includes from 'lodash/includes'

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
      unrelatedFilterInput: '',
      ISCOFilterInput: '',
      relatedFilterInput: '',
      minimumLengthOfFilterText: 3,
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

          this.currentUnrelatedIndex = null
        }
      }
    },
    isInCurrentChanges (occupationName) {
      return find(this.currentChanges, currentChange => currentChange.occupationName === occupationName) !== undefined
    },
    getISCONameById (id) {
      const foundISCOElem = find(this.ISCOList, nextISCOElem => nextISCOElem.id === id)

      return foundISCOElem ? foundISCOElem.name : null
    },
    onRemoveCurrentChangeClick (index) {
      this.currentChanges.splice(index, 1)
    },
    async onRemoveRelatedListClick (occupationName) {
      await this.$http.post('/api/unprocessedOccupationToISCORelations/cancelRelation', { occupationName })

      this.unrelatedList = (await this.$http.get('/api/latestOccupationsToISCORelations/unrelatedList')).data

      this.relatedList = (await this.$http.get('/api/latestOccupationsToISCORelations/relatedList')).data
    },
    async onSaveChanges () {
      await this.$http.post('/api/unprocessedOccupationToISCORelations/addRelations', { relations: this.currentChanges })

      this.unrelatedList = (await this.$http.get('/api/latestOccupationsToISCORelations/unrelatedList')).data

      this.relatedList = (await this.$http.get('/api/latestOccupationsToISCORelations/relatedList')).data

      this.currentChanges = []
    },
  },
  computed: {
    filteredUnrelatedList () {
      return this.unrelatedList.filter(nextUnrelated => includes(nextUnrelated.name.toLowerCase(), this.unrelatedFilterInput.toLowerCase()))
    },
    filteredISCOList () {
      if (this.ISCOFilterInput.length < this.minimumLengthOfFilterText) {
        return []
      }

      return this.ISCOList.filter(nextISCO => includes(nextISCO.name.toLowerCase(), this.ISCOFilterInput.toLowerCase()))
    },
    filteredRelatedList () {
      return this.relatedList.filter(nextRel => includes(nextRel.occupationName.toLowerCase(), this.relatedFilterInput.toLowerCase()))
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
