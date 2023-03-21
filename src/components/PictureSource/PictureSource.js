import styled from 'styled-components'
import React, { Component } from 'react'

class PictureSource extends Component {

  constructor() {
    super()

    this.element = styled.source``
  }

  render() {
    const Source = this.element
    const { theme, blok } = this.props


    const getMediaQuery = (media) => {
      switch (media) {
        case "mobile":
          const mobileMax = (parseInt(theme.mq.tablet) * 16) - 1
          return `(max-width: ${mobileMax / 16}rem)`
        case "tablet":
          const tabletMax = (parseInt(theme.mq.laptop) * 16) - 1
          return `(min-width: ${theme.mq.tablet}) and (max-width: ${tabletMax / 16}rem)`
        case "laptop":
          const laptopMax = (parseInt(theme.mq.desktop) * 16) - 1
          return `(min-width: ${theme.mq.laptop}) and (max-width: ${laptopMax / 16}rem)`
        case "desktop":
          const desktopMax = (parseInt(theme.mq.widescreen) * 16) - 1
          return `(min-width: ${theme.mq.desktop}) and (max-width: ${desktopMax / 16}rem)`
        case "widescreen":
          return `(min-width: ${theme.mq.widescreen})`
      }
    }

    return (
      <>
        <Source srcSet={`${blok.image.filename}/m/filters:format(webp)`} type="image/webp" media={getMediaQuery(blok.media_query)} />
        <Source srcSet={blok.image.filename} type="image/jpeg" media={getMediaQuery(blok.media_query)} />
      </>
    )
  }
}

export default PictureSource
