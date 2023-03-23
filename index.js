#!/usr/bin/env node

import uploader from './uploader/prompt.js'
import base from './src/base/prompt.js'
import datasources from './uploader/schemas/datasources/prompt.js'
import components from './src/components/prompt.js'
import dependencies from './src/dependencies.js'
import environment from './src/environment.js'

const __dirname = process.argv[2] === '--test' ? process.cwd()  + '/testing' : process.cwd()

uploader.createPrompt()
.then(({ storyblokApi, STORYBLOK_TOKEN }) => {
  return environment(__dirname).inject(STORYBLOK_TOKEN)
  .then(() => {
    return storyblokApi  
  })
})
.then((storyblokApi) => {
  return base.createPrompt(__dirname)
    .then(() => {
      return storyblokApi
    })
})
.then((storyblokApi) => {
  return datasources.createPrompt(storyblokApi)
  .then(() => {
    return storyblokApi
  })
}).then((storyblokApi) => {
  return components.createPrompt(storyblokApi, __dirname)
}).then(() => {
  dependencies(__dirname).inject()
})