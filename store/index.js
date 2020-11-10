import defaultPhoto from '../assets/images/defaultBlogPicture.jpg'
import client from '../plugins/contentful'

export const state = () => ({
  posts: [],
  categories: [],
  tags: []
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

  // 公開日時が空の投稿を非公開にする（下書き扱いにする）
  draftChip: () => (post) => {
    if (!post.fields.publishDate) {
      return 'draftChip'
    } 
  },

  // 引数で渡されたnameとobjをオブジェクトに格納して返す
  linkTo: () => (name, obj) => {
    return {
      name: `${name}-slug`,
      params: {
        slug: obj.fields.slug
      }
    }
  },

  // 引数で受け取ったカテゴリーに関連する投稿を配列にして返す、関数を返す
  relatedPosts: state => (category) => {
    const posts = []

    for (let i = 0; i < state.posts.length; i++) {
      const catId = state.posts[i].fields.category.sys.id
      // 引数で渡ってきたcategoryのidと一致するidを持つ投稿のみを配列に入れていく
      if(category.sys.id === catId) posts.push(state.posts[i])
    }

    return posts
  },

  // 引数で受け取ったタグに関連づいている投稿を配列にして返す、関数を返す
  associatedPosts: state => (currentTag) => {
    const posts = []

    for (let i = 0; i < state.posts.length; i++) {
      const post = state.posts[i]
      // タグが存在する場合の処理
      if (post.fields.tags) {
        // 引数で受け取ったタグと同じタグがついている投稿を配列にプッシュする
        const tag = post.fields.tags.find(tag => tag.sys.id === currentTag.sys.id)
        if (tag) posts.push(post)
      }
    }

    return posts
  }
}

export const mutations = {

  setPosts(state, payload) {
    state.posts = payload
  },

  // カテゴリーモデルとタグモデルを振り分ける
  setLinks(state, entries) {
    state.tags = []
    state.categories = []

    for (let i = 0; i < entries.length; i++ ) {
      const entry = entries[i]
      if (entry.sys.contentType.sys.id === 'tag') {
        state.tags.push(entry)
      }
      else if (entry.sys.contentType.sys.id === 'category') {
        state.categories.push(entry)
      }
    }

    // モデルの並び替えを行う（sortの小さい順に並べる）
    state.categories.sort((a, b) => a.fields.sort - b.fields.sort)
  }
}

export const actions = {

  async getPosts({ commit }) {
    // 全てのEntryを取得する
    await client.getEntries({
      content_type: process.env.CTF_BLOG_POST_TYPE_ID,    
      order: '-fields.publishDate',
      include: 1 // 関連先の記事の階層（デフォルトで１） 0の場合その記事自身、2の場合はtagに関連するモデルも取得する
    })
    .then((res) => {
      commit('setLinks', res.includes.Entry)  // タグの振り分けかカテゴリの振り分けか
      commit('setPosts', res.items)           // setLinksで
    }).catch(console.error)
  }
}