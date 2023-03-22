import inquirer from 'inquirer'
import fs from 'fs-extra'
import path from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const prompt = () => {
  
  const prompt = inquirer.createPromptModule()
  
  const foldersToCopy = ['context', 'hooks', 'pages', 'scss', 'styled', 'lib', 'locales']
  const foldersToCopyPromsises = []

  const handleLocales = (currentDir, folder, resolve, reject) => {
    const filename = 'next-i18next.config.js'
    fs.rename(path.join(currentDir, folder, filename), path.join(currentDir, filename), (err) => {
      if (err) {
        reject(err)
      }
      return resolve()
    })
  }

  const copyFolder = (folder, currentDir) => {
    return new Promise((resolve, reject) => {
      fs.copy(path.join(__dirname, folder), `${currentDir}/src/${folder}`, (err) => {
        if (err) {
          reject(err)
        }
        if (folder != 'locales') {
          console.log(`Copied folder: ${folder}`)
          return resolve()
        }
        handleLocales(currentDir, folder, resolve, reject)
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