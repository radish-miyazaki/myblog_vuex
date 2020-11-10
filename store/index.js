import defaultPhoto from '../assets/images/defaultBlogPicture.jpg'
import client from '../plugins/contentful'

export const state = () => ({
  posts: []
})

export const getters = {

  setEyeCatch: () => (post) => {
    // 投稿した記事の画像が存在する　かつ　画像が公開設定になっている場合の処理
    if (!!post.fields.image && !!post.fields.image.fields) {
      return { 
        url: `https:${post.fields.image.fields.file.url}`,
        title: post.fields.image.fields.title 
      }
    }
    else {
      return { 
        url: defaultPhoto, 
        title: 'defaultPhoto' 
      }
    }
  },

  draftChip: () => (post) => {
    if (!post.fields.publishDate) {
      return 'draftChip'
    } 
  },

  linkTo: () => (name, obj) => {
    return {
      name: `${name}-slug`,
      params: {
        slug: obj.fields.slug
      }
    }
  }
}

export const mutations = {
  setPosts(state, payload) {
    state.posts = payload
  }
}

export const actions = {

  async getPosts({ commit }) {
    // 全てのEntryを取得する
    await client.getEntries({
      content_type: process.env.CTF_BLOG_POST_TYPE_ID,    
      order: '-fields.publishDate'
    })
    .then(res => commit('setPosts', res.items))
    .catch(console.error)
  }
}