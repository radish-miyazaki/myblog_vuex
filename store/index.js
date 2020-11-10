import defaultPhoto from '../assets/images/defaultBlogPicture.jpg'
import client from '../plugins/contentful'

export const state = () => ({
  posts: [],
  categories: []
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
  },

  // 引数で受け取ったタグに関連する投稿を配列にして返す、関数を返す
  relatedPosts: state => (category) => {
    const posts = []
    for (let i = 0; i < state.posts.length; i++) {
      const catId = state.posts[i].fields.category.sys.id
      
      // 引数で渡ってきたcategoryのidと一致するidを持つ投稿のみを配列に入れていく
      if(category.sys.id === catId) posts.push(state.posts[i])
    }
    return posts
  }
}

export const mutations = {

  setPosts(state, payload) {
    state.posts = payload
  },

  setCategories(state, payload) {
    state.categories = payload
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
  },

  async getCategories({ commit }) {
    // 選択されたカテゴリと一致するもののみを取得
    await client.getEntries({
      content_type: 'category',
      order: 'fields.sort'
    })
    .then(res => commit('setCategories', res.items))
    .catch(console.error)
  }
}