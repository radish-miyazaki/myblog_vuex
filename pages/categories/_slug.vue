<template>
  <div>
    <breadcrumbs />
    <h1>{{ category.fields.name }}</h1>
    
    <div 
      v-for="(relatedPost, i) in relatedPosts" 
      :key="i"
    >
      {{ relatedPost.fields.category.fields.name }},
      {{ relatedPost.fields.title }}
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    relatedPosts() {
      return this.$store.getters.relatedPosts(this.category)
    }
  },

  async asyncData({ payload, store, params, error }) {
    const category = payload || await store.state.categories.find(cat => cat.fields.slug === params.slug)
  
    if(category) {
      return { category }
    } else {
      // 指定されたカテゴリが存在しない場合の処理 
      return error({ statusCode: 400 })
    }
  }

}
</script>