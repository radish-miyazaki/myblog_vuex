<template>
  <div>
    shareBtns.vue
    <div>
      {{ url }}
      {{ pageTitle }}
      {{ twitter }}
      {{ hashtag }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    pageTitle: {
      type: String,
      default: 'process.env.SITE_NAME'
    }
  },

  data() {
    return {
      url: (process.env.BASE_URL + this.$route.path),
      twitter: process.env.TWITTER_ACCOUNT,
      hashtag: process.env.SITE_NAME
    }
  }
}
</script>

<style>

</style>