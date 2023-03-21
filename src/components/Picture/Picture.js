import styled from 'styled-components'
import PictureSource from './PictureSource'
import React, { Component } from 'react'

class Picture extends Component {

  constructor() {
    super()

    this.element = styled.picture`
      display: flex;
      width: 100%;
    
      img {
        height: auto;
        width: 100%;
      }
    `
  }

  render() {
    const Picture = this.element
    const { theme, blok, storyblokEditable } = this.props
    return (
      <Picture {...storyblokEditable(blok)} theme={theme}>
      {blok.sources ? 
        blok.sources.map((source, index) => (
          <PictureSource theme={theme} blok={source} key={index} />
        ))
        : null
      }
      {
        blok.fallback_image ? (
          <img src={blok.fallback_image.filename} alt={blok.fallback_image.alt} />
        ) : null
      }
      
  </Picture>
    )
  }
}

export default Picture
