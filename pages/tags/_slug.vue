<template>
  <div>
    <breadcrumbs :add-items="addBreads" />
    <h1>{{ tag.fields.name }}</h1>
    <div
      v-for="(post, i) in relatedPosts"
      :key="i"
    >
      {{ post.fields.title }}
    </div>
  </div>
</template>

<script>
export default {

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
    }
  }
}
</script>