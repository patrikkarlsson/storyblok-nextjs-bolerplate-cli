import inquirer from 'inquirer'
import uploader from './uploader.js'
// import datasources from './schemas/datasources/index.js'
// import components from './schemas/components/index.js'



// const sync = async ({ STORYBLOK_PERSONAL_ACCESS_TOKEN, STORYBLOK_SPACE_ID, componentSchemasToAdd }) => {
//   const storyblokApi = uploader({ STORYBLOK_PERSONAL_ACCESS_TOKEN, STORYBLOK_SPACE_ID })
//   await datasources({ storyblokApi }).upload()
//   await components({ storyblokApi }).upload(componentSchemasToAdd)
// }

const uploaderPrompt = () => {
  const prompt = inquirer.createPromptModule()

  const createPrompt = () => {
    return prompt([
      {
        type: 'input',
        name: 'STORYBLOK_PERSONAL_ACCESS_TOKEN',
        message: 'Enter your personal storyblok access token:',
      },
      {
        type: 'input',
        name: 'STORYBLOK_SPACE_ID',
        message: 'Enter your storyblok space id:',
      }
    ]).then(({ STORYBLOK_PERSONAL_ACCESS_TOKEN, STORYBLOK_SPACE_ID }) => {
      const storyblokApi = uploader({ STORYBLOK_PERSONAL_ACCESS_TOKEN, STORYBLOK_SPACE_ID })
      return storyblokApi
    })
  }

  return {
    createPrompt,
  }
}

export default uploaderPrompt()

