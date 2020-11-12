<template>
  <v-container fluid>

    <template v-if="currentPost">
      <breadcrumbs :add-items="addBreads" /> 

      <v-img
        :src="setEyeCatch(currentPost).url"
        :alt="setEyeCatch(currentPost).title"
        max-height="300"
        class="mx-auto"
        gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
        dark
      >
      <v-row
          class="fill-height ma-0"
          align="center"
          justify="center"
        >
          <div class="font-weight-bold title">
            {{ currentPost.fields.title }}
          </div>
        </v-row>
      </v-img>

      <v-row justify="center">
        <v-col
          cols="12"
          sm="11"
          md="10"
          xl="8"
        >
          <h2 class="font-weight-bold title pt-2">{{ currentPost.fields.title }}</h2>
          <h3 class="subtitle-2 pl-10">
            <v-icon>far fa-calendar-alt</v-icon>
            {{ currentPost.fields.publishDate }}
          </h3>
          <v-divider class="ma-5"></v-divider>

          {{ currentPost.fields.body }}

          <v-divider class="ma-5"></v-divider>
          <!---------------------- フォロー＆シェアボタン ---------------------->
          <client-only>
            <share-btns :page-title="currentPost.fields.title" />
            <follow-btns />
          </client-only>
          <!---------------------- // フォロー＆シェアボタン ---------------------->
        </v-col>
      </v-row>
    </template>

    <template v-else>
      <v-row justify="center">
        お探しの記事は見つかりませんでした。
      </v-row>
    </template>
    
    <v-divider class="ma-5"></v-divider>

    <div class="d-flex justify-center">
      <v-btn
        outlined
        color="primary"
        to='/'
        x-large
      >
      <v-icon size="16">
        fas fa-angle-double-left
      </v-icon>
      <span class="ml-1">ホームへ戻る</span>
      </v-btn>
    </div>


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