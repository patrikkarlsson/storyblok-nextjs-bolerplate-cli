import path from 'path'
import fs from 'fs-extra'

const dependencies = {
  'classnames': '*',
  'sass': '*',
  'gsap': '*',
  'react': '*',
  '@storyblok/react': '*',
  'styled-components': '*',
  'zustand': '*',
  '@studio-freight/hamo': '*',
  '@studio-freight/lenis': '*',
  '@studio-freight/tempus': '*',
  'storyblok-rich-text-react-renderer': '*',
  '@drewbot/sass-flexbox-grid': '*',
}

export default (__dirname) => {

  const readPackageJson = () => {
    return JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json')))
  }

  const writeToPackageJson = (packageFile) => {
    fs.writeFileSync(path.join(__dirname, 'package.json'), JSON.stringify(packageFile, null, 2))
  }

  const inject = () => {
    const packageFile = readPackageJson()
    packageFile.dependencies = {
      ...packageFile.dependencies,
      ...dependencies,
    }
    writeToPackageJson(packageFile)
  }

  return {
    inject,
  }
}

