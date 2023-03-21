import styled, { css } from 'styled-components'
import React, { Component } from 'react'

class Section extends Component {

  constructor() {
    super()

    this.element = styled.section`
    ${({ theme, backgroundColor, spacing }) => css`
      display: flex;
      flex-direction: column;
      width: 100%;
      margin: 0 auto;
      position: relative;
      ${theme.spacing(spacing)}
  
      ${backgroundColor && css`
        &:after {
          position: absolute;
          content: '';
          background-color: ${theme.color[backgroundColor]};
          width: 100vw;
          height: 100%;
          top: 0;
          z-index: -1;
          left: 50%;
          transform: translateX(-50%);
        }
      `}
    `}
  `
  }

  render() {
    const Section = this.element
    const { blok, storyblokEditable } = this.props
    const classnames = blok.classnames && blok.classnames.length > 0 ? blok.classnames.split(',').map(c => c.trim()) : []
    return (
      <Section {...storyblokEditable(blok)} className={classnames} spacing={blok.spacing} backgroundColor={blok.background_color.currentColor}>
        {this.props.children}
      </Section>
    )
  }
}

export default Section
