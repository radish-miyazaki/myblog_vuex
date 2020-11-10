<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col
        cols="12"
        sm="11"
        md="10"
        xl="8"
      >
        <v-row v-if="posts.length">
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
                max-width="400"
                max-height="225" 
              />

                <v-card-title class="align-end fill-height font-weight-bold">
                  {{ post.fields.title }}
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
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import draftChip from '../components/posts/draftChip'

export default {

  components: {
    draftChip
  },

  computed: {
    ...mapState(['posts']),
    ...mapGetters(['setEyeCatch', 'draftChip', 'linkTo'])
  }
}
</script>

<style>

</style>
