<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col
        cols="12"
        sm="11"
        md="10"
        xl="8"
      >
        <!---------------------- 投稿が存在する場合 ---------------------->
        <v-row v-if="posts.length">
          <!---------------------- 投稿数だけループ ---------------------->
          <v-col
            v-for="(post, i) in posts" :key="i"
            cols="12"
            sm="6"
            md="4"
            xl="3"
          >
            <v-card
              max-width="400"
              class="mx-auto"
            >
              <v-img
                :src="setEyeCatch(post).url"
                :alt="setEyeCatch(post).title"
                :aspect-ratio:="16/9"
                max-height="200"
              >

                <v-card-text>
                  <v-chip
                    small
                    dark
                    :color="categoryColor(post.fields.category)"
                    :to="linkTo('categories', post.fields.category)"
                    class="font-weight-bold"
                  >
                    {{ post.fields.category.fields.name }}
                  </v-chip>
                </v-card-text>

              </v-img>

              <v-card-title>
                <nuxt-link
                  :to="linkTo('posts', post)"
                >
                  {{ post.fields.title }}
                </nuxt-link>
              </v-card-title>

              <v-card-text>
                {{ post.fields.publishDate }}
                <span :is="draftChip(post)"></span>
              </v-card-text>

              <v-list-item three-line style="min-height: unset;">
                <v-list-item-subtitle>
                  {{ post.fields.body }}
                </v-list-item-subtitle>
              </v-list-item>

              <v-card-actions>
                <template v-if="post.fields.tags">
                  <v-chip
                    v-for="(tag, i) in post.fields.tags"
                    :key="i"  
                    :to="linkTo('tags', tag)"
                    small
                    label
                    outlined
                    class="ma-1"
                  >
                    <v-icon
                      left
                      size="18"
                      color="blue-grey darken"
                    >
                      mdi-label
                    </v-icon>
                    {{ tag.fields.name }}
                  </v-chip>
                </template>
              </v-card-actions>

              <v-card-actions>
                <v-spacer />
                <v-btn
                  text
                  color="primary"
                  :to="linkTo('posts', post)"
                >
                  この記事を見る
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
        <div v-else class="text-center">
          記事はありません
        </div>
      </v-col>
      <!---------------------- // 投稿数だけループ ---------------------->
    </v-row>
    <!---------------------- // 投稿が存在する場合 ---------------------->
  </v-container>
</template>

<script>
import client from '../plugins/contentful'
import { mapGetters } from 'vuex'
import draftChip from '../components/posts/draftChip'

export default {

  async asyncData({ env }) {
    let posts = []
    // 全てのEntryを取得する
    await client.getEntries({
      content_type: env.CTF_BLOG_POST_TYPE_ID,    
      order: '-fields.publishDate'
    })
    .then(res => (posts = res.items))
    .catch(console.error)
    return { posts }
  },

  components: {
    draftChip
  },

  computed: {
    categoryColor() {
      return (category) => {
        // カテゴリ名によって色分けする
        switch(category.fields.name) {
          case 'RubyOnRails': return '#C73A31'
          case 'Nuxt.js': return '#236244'
          case 'others': return 'primary'
          default: return 'grey darken-3'
        }
      }
    },
    ...mapGetters(['setEyeCatch', 'draftChip', 'linkTo'])
  }
}
</script>

<style>
</style>
