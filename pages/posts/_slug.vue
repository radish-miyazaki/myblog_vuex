<template>
  <v-container fluid>

    <template v-if="currentPost">
      <breadcrumbs :add-items="addBreads" />    
      {{ currentPost.fields.title }}
      <v-img
        :src="setEyeCatch(currentPost).url"
        :alt="setEyeCatch(currentPost).title"
        :aspect-ratio="16/9"
        width="700"
        height="400"
        class="mx-auto"
      />
      {{ currentPost.fields.publishDate }}
      <span :is="draftChip(currentPost)"></span>
      <br>
      {{ currentPost.fields.body }}
    </template>

    <template v-else>
      お探しの記事は見つかりませんでした。
    </template>

    <div>
      <v-btn
        outlined
        color="primary"
        to='/'
      >
      <v-icon size="16">
        fas fa-angle-double-left
      </v-icon>
      <span class="ml-1">ホームへ戻る</span>
      </v-btn>
    </div>

    <!---------------------- フォロー＆シェアボタン ---------------------->
    <client-only>
      <share-btns :page-title="currentPost.fields.title" />
      <follow-btns />
    </client-only>
    <!---------------------- // フォロー＆シェアボタン ---------------------->

  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import draftChip from '../../components/posts/draftChip'
import followBtns from '../../components/ui/followBtns'
import shareBtns from '../../components/ui/shareBtns'

export default {

  async asyncData({ payload, store, params, error }) {
    const currentPost = payload || await store.state.posts.find(post => post.fields.slug === params.slug)
  
    if(currentPost) {
      return {
        currentPost,
        category: currentPost.fields.category
      }
    } else {
      return error({ statusCode: 400 })
    }
  },

  computed: {

    addBreads() {
      return [
        {
          icon: 'mdi-folder-outline',
          text: this.category.fields.name,
          to: this.linkTo('categories', this.category)
        }
      ]
    },
    ...mapGetters(['setEyeCatch', 'draftChip', 'linkTo'])
  },

  components: {
    draftChip, shareBtns, followBtns
  }
}
</script>