<template>
  <div>
    <breadcrumbs :add-items="addBreads" />

    <v-col 
      cols="12"
    >
      <div class="tag-title">
        <h2>
          【Tag】{{ tag.fields.name }} : {{ relatedPosts.length }}件
        </h2>
        <v-divider />
      </div>
      <v-list>
        <v-list-item
          v-for="(visiblePost, i) in visiblePosts"
          :key="i"
          :to="$store.getters.linkTo('posts', visiblePost)"
        >
          <v-list-item-avatar
            rounded
            max-width="15"
          >
            <v-img
              :src="setEyeCatch(visiblePost).url"
              :alt="setEyeCatch(visiblePost).title"
            />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>
              {{ visiblePost.fields.title }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <!-- ページネーション -->
      <v-pagination
        v-model="page"
        :length="Math.ceil(relatedPosts.length/totalVisible)"
        :total-visible="totalVisible"
        circle
        prev-icon="mdi-menu-left"
        next-icon="mdi-menu-right"
        @input="pageChange"
      />
    </v-col>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    
    data(){
    return {
      isLoading: false,
      page: 1,
      pageCount: 0,
      totalVisible: 7
    }
  },

  asyncData({ payload, store, params, error, env }) {
    const tag = payload || store.state.tags.find(tag => tag.fields.slug === params.slug)
    if (tag) {
      const relatedPosts = store.getters.associatedPosts(tag)
      return { tag, relatedPosts }

    } else {
      error({ statusCode: 400 })
    }
  },
  
  computed: {
    addBreads() {
      return [
        {
          icon: 'mdi-tag-outline',
          text: 'タグ一覧',
          to: '/tags'
        }
      ]
    },
    
    visiblePosts: {
      get() {
        return this.relatedPosts.slice((this.page - 1) * this.totalVisible, this.page * this.totalVisible)
      },
      set() {
      }
    },
    ...mapGetters(['setEyeCatch'])
  },

    methods: {
    pageChange(pageNumber) {
      this.visiblePosts = this.relatedPosts.slice(this.totalVisible * (pageNumber - 1), this.totalVisible * (pageNumber))
    }
  }
}
</script>

<style lang="scss" scoped>
.tag-title {
  padding: 10px 0;
}