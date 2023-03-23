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
      },
      {
        type: 'input',
        name: 'STORYBLOK_TOKEN',
        message: 'Enter your storyblok token:',
      }
    ]).then(({ STORYBLOK_PERSONAL_ACCESS_TOKEN, STORYBLOK_SPACE_ID, STORYBLOK_TOKEN }) => {
      const storyblokApi = uploader({ STORYBLOK_PERSONAL_ACCESS_TOKEN, STORYBLOK_SPACE_ID })
      return { 
        storyblokApi,
        STORYBLOK_TOKEN,
      }
    })
  }

  return {
    createPrompt,
  }
}

export default uploaderPrompt()

