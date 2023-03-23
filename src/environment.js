import path from 'path'
import fs from 'fs-extra'

export default (__dirname) => {

  const readEnvFile = () => {
    return fs.readFile(path.join(__dirname, '.env'), 'utf8')
  }

  const parseEnvFile = (envFile) => {
    return envFile.split('\r')
  }

  const checkIfParamExists = (envFile, param) => {
    return envFile.includes(param)
  }

  const writeEnvFile = (envFile) => {
    return fs.writeFile(path.join(__dirname, '.env'), envFile)
  }

  const inject = (STORYBLOK_TOKEN) => {
    return readEnvFile()
    .then((envFile) => {
      parsedFile = parseEnvFile(envFile)
      const param = `STORYBLOK_TOKEN=${STORYBLOK_TOKEN}`
      if (!checkIfParamExists(parsedFile, param)) {
        envFile.push(param)
        envFile = envFile.join('\r')
        return writeEnvFile(envFile)
      }
    }).catch(() => {
      const param = `STORYBLOK_TOKEN=${STORYBLOK_TOKEN}`
      return writeEnvFile(param)
    })
  }

  return {
    inject,
  }
}

