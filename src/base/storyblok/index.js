
export default class Storyblok {

  constructor(storyblokApi, locales = [], rootName = 'start', baseLayoutName) {
    this.storyblokApi = storyblokApi
    this.rootName = rootName
    this.locales = locales
    this.baseLayoutName = baseLayoutName
  }

  async getPaths() {
    let { data } = await this.storyblokApi.get('cdn/links/')

    let paths = []
      
    Object.keys(data.links).forEach((linkKey) => {
      
      const route = data.links[linkKey]  
      if (route.is_folder) {
        return
      }

      if (route.name === this.baseLayoutName) {
        return
      }

      let slugArr = route.slug.split('/').filter((e) => e)

      let currentLocale = null

      if (this.locales.includes(slugArr[0])) {
        currentLocale = slugArr[0]
        if (slugArr.length == 1) {
          slugArr = false
        } else {
          slugArr.splice(0, 1)
        }
      }
      paths.push({ params: { slug: slugArr }, locale: currentLocale })
    })

    return paths
  }

  async getStory(path, version = 'published') {
    
    let sbParams = {
      version,
    }

    const storyPath = path ?
      `cdn/stories/${path.join('/')}` :
      `cdn/stories/start`

    let story = await this.storyblokApi.get(storyPath, sbParams)
    if (story.data.story) {
      return story.data.story
    }

    return null    
  }
}