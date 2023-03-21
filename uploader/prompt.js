import inquirer from 'inquirer'
import uploader from './uploader.js'

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

