<template>
  <div>
    <header>
      <v-app-bar
        hide-on-scroll
        dense
        color="blue-grey darken-2"
      >
        <v-spacer />
        <v-toolbar-title 
          class="white--text font-weight-bold display-1"
        > 
          RADISH <span class="deep-orange--text">TECH</span>
        </v-toolbar-title>
        <v-spacer />
        <search-form />

        <template v-slot:extension>
          <v-tabs
            centered
          >
            <v-tab
              v-for="(menuItem, index) in menuItems"
              :key="index"
              class="white--text"
            >
              {{ menuItem.name }}
            </v-tab>
          </v-tabs>
        </template>
      </v-app-bar>
    </header>
  </div>
</template>

<script>
import searchForm from '../ui/searchForm'

export default {
  data() {
    return {
      menuItems: [
        {
          name: 'HOME',
          url: '/'
        },
        {
          name: 'ABOUT',
          url: '/'
        },
        {
          name: 'BLOG',
          url: '/'
        },
        {
          name: 'TWITTER',
          url: '/'
        },
        {
          name: 'GITHUB',
          url: '/'
        }

      ]
    }
  },

  components: {
    searchForm
  }
}
</script>

<style lang="scss" scoped>

.v-toolbar__title {
  overflow: visible !important;
  margin-right: 50px !important;
  font-family: 'Noto Sans JP', sans-serif;
}

</style>