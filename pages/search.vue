<template>
  <v-container fluid>
    <v-form
      @submit.prevent="getPosts()">
      <v-row align="center">
        <v-col
          cols="12"
          sm="10"
          md="8"
        >
          <v-text-field
            v-model="query"
            outlined
            hide-details
            placeholder="Search..."
            autofocus
          />
        </v-col>
        <v-col
          cols="12"
          sm="2"
          md="4"
        >
          <v-btn
            color="teal"
            dark
            rounded
            @click="getPosts()"
          >
            検索する
          </v-btn>
        </v-col>
        
        <v-col cols="12">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                検索結果：{{ posts.length }}件
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <template v-if="isLoading">
            <div class="text-center">
              <v-progress-circular
                inteterminate
                color="gray"
              />
            </div>
          </template>

          <template v-else>
            <div class="py-8">

              <!-- 検索結果が存在した場合の描画 -->
              <template v-if="posts.length">
                <v-list-item
                  v-for="(post, i) in visiblePosts"
                  :key="i"
                  :to="$store.getters.linkTo('posts', post)"
                >
                  <v-list-item-content>
                    <v-list-item-title>
                      {{post.fields.title }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <div class="text-center py-2">
                  <v-pagination
                    v-model="page"
                    :length="Math.ceil(posts.length/totalVisible)"
                    :total-visible="totalVisible"
                    circle
                    prev-icon="mdi-menu-left"
                    next-icon="mdi-menu-right"
                    @input="pageChange"
                  />
                </div>
              </template>

              <!-- 検索結果が存在しなかった場合の描画 -->
              <template v-else>
                <v-list-item class="justify-center">
                  <div class="text-center">
                    <p>
                      キーワードに一致する投稿が見つかりませんでした。
                    </p>
                    <v-icon>
                      mdi-emoticon-cry-outline
                    </v-icon>
                  </div>
                </v-list-item>
              </template>
            </div>
          </template>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import client from '../plugins/contentful'

export default {
  data(){
    return {
      query: '',
      posts: [],
      isLoading: false,
      page: 1,
      pageCount: 0,
      totalVisible: 7,
    }
  },

  watch: {
    '$route.query.q': {
      handler(newVal) {
        this.query = newVal
        this.getPosts()
      },
      immediate: true
    }
  },

  methods: {
    async getPosts() {
      if (this.isRequired) {
        this.isLoading = true
        await client.getEntries({
          content_type: process.env.CTF_BLOG_POST_TYPE_ID,
          query: this.query
        })
        .then(({ items }) => {
          this.posts = items
        }).catch(console.error)
        this.isLoading = false
      }
    },

    pageChange(pageNumber) {
      this.visiblePosts = this.posts.slice(this.totalVisible * (pageNumber - 1), this.totalVisible * (pageNumber))
    }
  },

  computed: {
    isRequired() {
      return !!this.query && !/^\s+$/.test(this.query)
    },

    visiblePosts() {
      return this.posts.slice((this.page - 1) * this.totalVisible, this.page * this.totalVisible)
    }
  }
}
</script>