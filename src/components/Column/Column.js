import cn from 'classnames'
import styled, { css } from 'styled-components'
import React, { Component } from 'react'

class Row extends Component {

  constructor() {
    super()

    this.column = styled.div`
      ${({ spacing, backgroundColor, theme }) => css`
      position: relative;
      ${backgroundColor && `
        background-color: ${theme.color[backgroundColor]};
      `}

      ${spacing.includes('none') && `
        padding: 0;
      `}

      ${spacing.includes('none-bottom') && `
        padding-bottom: 0;
      `}

      ${spacing.includes('none-right') && `
        padding-right: 0;
      `}
      
      ${spacing.includes('none-left') && `
        padding-left: 0;
      `}

      ${spacing.includes('none-top') && `
        padding-top: 0;
      `}

      ${(spacing.includes('all') || spacing.includes('left') || spacing.includes('right') || spacing.includes('bottom')) ? `
        padding: 0;
      ` : ``}
    `}
    `
  }

  render() {
    const Column = this.column
    const { blok, storyblokEditable } = this.props
    return (
      <Column {...storyblokEditable(blok)} key={blok._uid} backgroundColor={blok.background_color.currentColor} spacing={blok.spacing} className={cn(blok.style, blok.visibility)}>
        {this.props.children}
      </Column>
    )
  }
}

export default Row
