import inquirer from 'inquirer'
import uploader from './index.js'

const datasourcesPrompt = () => {
  const prompt = inquirer.createPromptModule()

  const createPrompt = (storyblokApi) => {

    const { upload } = uploader({ storyblokApi })

    return prompt([
      {
        name: 'DATASOURCES',
        type: 'checkbox',
        message: 'Select datasources to upload:',
        choices: ['Media Queries', 'Spacing'],
      },
    ]).then(({ DATASOURCES }) => {
      return upload(DATASOURCES)
    })
  }

  return {
    createPrompt,
  }
}

export default datasourcesPrompt()

