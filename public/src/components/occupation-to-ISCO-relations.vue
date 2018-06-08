<template>
  <b-row class="occupation-to-ISCO-relations-container">
    <button @click="onBoomClick">Boom</button>

    <b-col class="relations-content-column" cols="3">
      <b-row class="relations-content-column-first-row">
        <b-btn
          v-b-popover.hover="'awbdouabw obawdb aobuwdouabw oubawodboawbdbou abw.'"
          variant="outline-primary"
          class="hint-element-class"
        >
          <b>?</b>
        </b-btn>

        <h5>
          დაუკავშირებელი
        </h5>
      </b-row>

      <b-row class="relations-content-column-second-row">
        <b-form-input type="text"></b-form-input>
      </b-row>

      <b-row class="relations-content-row-third-row relations-unrelated-card-list">
        <b-card class="relations-list-card">boom boom</b-card>
      </b-row>

      <b-row style="flex: 0 1 auto; border: 1px solid black;">
        bumba selected
      </b-row>
    </b-col>

    <b-col class="relations-content-column" cols="3">
      <b-row class="relations-content-column-first-row">
        <h5>
          ISCO
        </h5>
      </b-row>

      <b-row class="relations-content-column-second-row">
        <b-form-input type="text"></b-form-input>
      </b-row>

      <b-row class="relations-content-row-third-row">
        <b-card class="relations-list-card">boom boom</b-card>
      </b-row>
    </b-col>

    <b-col class="relations-content-column" cols="3">
      <b-row class="relations-content-column-first-row">
        <h5>
          მიმდინარე&nbsp;ცვლილებები
        </h5>
      </b-row>

      <b-row class="relations-content-column-second-row">
        <b-button style="width: 100%;">ცვლილებების დადასტურება</b-button>
      </b-row>

      <b-row class="relations-content-row-third-row">
        <b-card class="relations-list-card">boom boom</b-card>
      </b-row>
    </b-col>

    <b-col class="relations-content-column" cols="3">
      <b-row class="relations-content-column-first-row">
        <h5>
          დაკავშირებული
        </h5>
      </b-row>

      <b-row class="relations-content-column-second-row">
        <b-form-input type="text"></b-form-input>
      </b-row>

      <b-row class="relations-content-row-third-row">
        <b-card class="relations-list-card">boom boom</b-card>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: 'occupation-to-ISCO-relations',
  props: [],
  created () {},
  methods: {
    async onBoomClick () {
      const result = await this.$http.get('/api/latestOccupationsToISCORelations/unrelatedList')

      console.log('boom: ', result)
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
.relations-content-column {
  height: 100%;
  min-width: min-content;

  display: flex;
  flex-flow: column;

  padding-left: 20px;
  padding-right: 20px;
}
.relations-content-column-first-row {
}
.relations-content-column-second-row {
  padding-bottom: 8px;
}
.relations-content-row-third-row {
  flex: 1 1 auto;
}
.relations-list-card {
  width: 100%;
}
.relations-unrelated-card-list {
  padding-bottom: 8px;
}
.hint-element-class {
  border-radius: 50%;
  box-shadow: none !important;
  margin: 0px 5px 1px 0px;
}
</style>
