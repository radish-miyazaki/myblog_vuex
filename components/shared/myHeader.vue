<template>
  <div>
    <header>
      <v-app-bar
        hide-on-scroll
        dense
        color="blue-grey darken-2"
      >
        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

        <v-toolbar-title 
          class="white--text font-weight-bold display-1"
        >
          <nuxt-link to="/" class="site-title">
            RADISH <span class="deep-orange--text">TECH</span>
          </nuxt-link>
        </v-toolbar-title>
        <v-spacer />
        <v-toolbar-items>
          <search-form />
        </v-toolbar-items>

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
      <v-navigation-drawer
        v-model="drawer"
        fixed
        temporary
      >
        <v-list
          nav
          dense
        >
          <v-list-item-group>
            <v-list-item
            v-for="(menuItem, i) in menuItems"
            :key="i"
            >
              <v-list-item-title>
                {{ menuItem.name }}
              </v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
    </header>
  </div>
</template>

<script>
import searchForm from '../ui/searchForm'
import { mapState, mapGetters } from 'vuex'

export default {
  data() {
    return {
      drawer: false,
      menuItems: [
        {
          name: 'HOME',
          to: '/'
        },
        {
          name: 'ABOUT',
          to: '/'
        },
        {
          name: 'CATEGORY',
          to: '/'
        },
        {
          name: 'TAGS',
          to: '/'
        },
        {
          name: 'TWITTER',
          to: '/'
        },
        {
          name: 'GITHUB',
          to: '/'
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
/* 共通化用変数＆mixin */
/* メディアクエリブレークポイント */
$xs: 600;
$sm: 960;
$md: 1264;
$lg: 1904;

$sp-max: calc($xs - 1)px;
$tb-min: $xs + px;
$tb-max: calc($sm - 1)px;
$pc-min: $sm + px;

/* PC */
@mixin display_pc {
  @media (min-width: $pc-min) {
    @content;
  }
}

/* タブレット */
@mixin display_tab {
  @media (min-width: $tb-min) and (max-width: $tb-max) {
    @content;
  }
}

/* スマホ */
@mixin display_sp {
  @media (max-width: $sp-max) {
    @content;
  }
}

/* //////////////////////////////////////////////// */

.v-toolbar__title {
  overflow: visible !important;
  margin-right: 50px !important;
  font-family: 'Noto Sans JP', sans-serif;
  padding-top: 10px;
}
.site-title {
  text-decoration: none;
  color: rgba(255, 255, 255, 0.87);
}

.v-app-bar__nav-icon {
  @include display_pc {
    display: none !important;
  }
}

.v-tabs {
  display: none;

  @include display_pc {
    display: block !important;
  }
}

.v-toolbar__items {
  display:none;

  @include display_pc {
    display: block !important;
    padding-top: 10px;
  }
}
</style>