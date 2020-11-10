<template>
  <div>
    <breadcrumbs :add-items="addBreads" />

    <v-container>
      <v-row justify="center">
        <v-col
          cols="12"
          sm="10"
          md="8"
        >

          <v-card>
            <v-card-title>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              />
            </v-card-title>

            <!-- データテーブル -->
            <v-data-table
              :headers="isLoading ? [] : headers"
              :items="isLoading ? [] : tableItems"
              :search="search"
              :sort-by="sortBy"
              :items-per-page="itemsPerPages"
              :page.sync="page"
              :loading="isLoading"
              loading-text="Loading now..."
              sort-desc
              hide-default-footer
              @page-count="pageCount = $event"
            >

              <!-- プログレスバー -->
              <template v-slot:progress>
                <v-progress-linear
                  color="gray"
                  :height=10
                  indetermine
                />
              </template>

              <template v-slot:[`item.fields.name`]="{ item }" >
                <v-icon size="18">
                  mdi-tag-outline
                </v-icon>
                <nuxt-link :to="linkTo('tags', item)">
                  {{ item.fields.name }}
                </nuxt-link>
              </template>
            </v-data-table>

            <div class="text-center py-2">
              <v-pagination
                v-model="page"
                :length="pageCount"
                :total-visible="totalVisible"
                circle
                prev-icon="mdi-menu-left"
                next-icon="mdi-menu-right"
              />
            </div>
          </v-card>

        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  created() {
    this.isLoading = true
  },

  mounted() {
    this.$nextTick().then((res) => {
      setTimeout(() => {
        res.isLoading = false
      }, 500)
    })
  },
  data() {
    return (
      {
        search: "",
        sortBy: "fields.postcount",
        itemsPerPages: 10,
        page: 1,
        pageCount: 0,
        totalVisible: 7,
        isLoading: false,
        headers: [
          { 
            text: 'タグ',
            align: 'left',
            value: 'fields.name'
          },
          { 
            text: '投稿数',
            align: 'center',
            width: 150,
            value: 'fields.postcount'
          }
        ]
      }
    )
  },
  computed: {
    ...mapState(['tags']),
    ...mapGetters(['linkTo']),

    addBreads() {
      return [{
        icon: 'mdi-tag-outline',
        text: 'タグ一覧',
        to: '/tags',
        disabled: true,
        iconColor: 'gray'
      }]
    },

    tableItems() {
      const tags = []

      for (let i = 0; i < this.tags.length; i++) {
        const tag = this.tags[i]
        tag.fields.postcount = this.$store.getters.associatedPosts(tag).length
        tags.push(tag)
      }

      return tags 
    }
  }
}
</script>