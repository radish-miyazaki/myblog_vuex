<template>
  <div>
    <v-form
      @submit.prevent="submit"
    >

      <v-text-field
        hide-details
        placeholder="Search..."
        prepend-inner-icon="mdi-magnify"
        dense
        dark
        color="white"
        class="white--text"
        ref="searchForm"
        v-model="query"
      />

    </v-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: ''
    }
  },

  methods: {

    submit() {
      if(this.validQuery){
        this.$router.push({
          path: '/search',
          query: {
            q: this.query
          }
        })
        this.query = ''
        this.$refs.searchForm.blur()
      }
    }
  },

  computed: {

    validQuery() {
      return !!this.query && // 入力必須
        !/^\s+$/.test(this.query) && // 空白のみ禁止
        this.$route.query.q !== this.query // 値の変化
    }
  }
}
</script>
