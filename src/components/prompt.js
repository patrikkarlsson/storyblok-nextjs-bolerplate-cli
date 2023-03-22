import inquirer from 'inquirer'
import fs from 'fs-extra'
import { fileURLToPath } from 'url'
import path from 'path'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const datasourcesPrompt = () => {
  const prompt = inquirer.createPromptModule()

  const SCHEMA_COMPONENTS = ['BaseLayout']

  const createPrompt = (storyblokApi, currentDir) => {

    const uploadComponent = (component) => {
      return storyblokApi.post('/components', {
        component,
      }).then(() => {
        console.log(`Component ${component.name} uploaded!`)
      })
    }

    const createComponentDir = (component) => {
      return new Promise((resolve, reject) => {
        fs.mkdir(`${currentDir}/src/components/${component}`, { recursive: true }, (err) => {
          if (err) {
            resolve(false)
          }
          resolve(true)
        })
      })
    }

    const copyComponent = (component) => {
      return new Promise((resolve, reject) => {
        fs.readdir(path.join(__dirname, component), (err, files) => {
          if (err) {
            reject(err)
          }
          files.forEach((file) => {
            if (file.indexOf('.schema.json') === -1) {
              fs.copy(path.join(__dirname, component, file), `${currentDir}/src/components/${component}/${file}`, { overwrite: false }, (err) => {
                if (err) {
                  reject(err)
                }
                resolve()
              })
            }
          })
        })
      })
    }

    const readComponentSchema = (component) => {
      return new Promise((resolve) => {
        fs.readFile(path.join(__dirname, component, `${component.toLowerCase()}.schema.json`), 'utf8', (err, data) => {
          if (err || !data) {
            return resolve(false)
          }
          resolve(JSON.parse(data))
        })
      })
    }


    return prompt([
      {
        name: 'COMPONENTS',
        type: 'checkbox',
        message: 'Select components:',
        choices: ['BaseLayout', 'Grid layout', 'Content', 'DynamicComponent', 'Footer', 'Header', 'Layout', 'Page', 'Picture', 'Section'],
      },
    ]).then(({ COMPONENTS }) => {

      const componentsPromises = []

      const componentsToAdd = COMPONENTS

      if (componentsToAdd.includes('Grid layout')) {
        componentsToAdd.push('Row')
        componentsToAdd.push('Column')
        componentsToAdd.splice(componentsToAdd.indexOf('Grid layout'), 1)
      }

      if (componentsToAdd.includes('Picture')) {
        componentsToAdd.push('PictureSource')
      }

      componentsToAdd.forEach((component) => {
        componentsPromises.push(new Promise((resolve, reject) => {
          return readComponentSchema(component)
          .then((componentSchema) => {
            if (!componentSchema){
              return Promise.resolve()
            }
            return uploadComponent(componentSchema)
          }).then(() => {
            if (SCHEMA_COMPONENTS.includes(component)) {
              return resolve(true)
            }
            return Promise.resolve()
          }).then(() => {
            return createComponentDir(component)
          }).then((created) => {
            if (created) {
              return copyComponent(component)
            }
            return Promise.resolve()
          }).then(() => {
            resolve()
          }).catch((err) => {
            console.log('Something went wrong: ', err)
          })
        }))
      })
      return Promise.all(componentsPromises)
    })
  }

  return {
    createPrompt,
  }
}

export default datasourcesPrompt()

