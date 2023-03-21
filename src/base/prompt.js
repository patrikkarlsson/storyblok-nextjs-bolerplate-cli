import inquirer from 'inquirer'
import fs from 'fs-extra'
import path from 'path'

const prompt = () => {
  
  const prompt = inquirer.createPromptModule()
  
  const foldersToCopy = ['context', 'hooks', 'pages', 'scss', 'styled', 'lib']
  const foldersToCopyPromsises = []

  const copyFolder = (folder, __dirname) => {
    return new Promise((resolve, reject) => {
      fs.copy(path.resolve(`./src/base/${folder}`), `${__dirname}/src/${folder}`, (err) => {
        if (err) {
          reject(err)
        }
        console.log(`Copied folder: ${folder}`)
        resolve()
      })
    })
  }

  const createPrompt = (__dirname) => {
    return new Promise((resolve, reject) => {
      return prompt([
        {
          type: 'confirm',
          name: 'ADD_BASE',
          message: 'Do you want to add base folders?',
        },
      ]).then(({ ADD_BASE }) => {
        // Start copy folders
  
        if (!ADD_BASE) {
          return resolve()
        }
  
        foldersToCopy.forEach((folder) => {
          foldersToCopyPromsises.push(copyFolder(folder, __dirname))
        })
        Promise.all(foldersToCopyPromsises).then(() => {
          resolve()
        }).catch((err) => {
          reject(err)
        })
      })
    })
    
  }

  return {
    createPrompt,
  }
}

export default prompt()