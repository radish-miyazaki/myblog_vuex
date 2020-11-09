import defaultPhoto from '../assets/images/defaultBlogPicture.jpg'

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
  } 
}