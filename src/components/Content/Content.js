import styled, { css } from 'styled-components'
import React, { Component } from 'react'

class Content extends Component {
  constructor() {
    super()
    this.element = styled.div`
      ${({ textColor, textAlign }) => css`
          width: 100%;
          text-align: ${textAlign};

          color: ${theme.color[textColor]};

          a {
            color: ${theme.color[textColor]};
            text-decoration: underline;
          }
        }
      `}
    `
  }

  render() {
    const Content = this.element
    const { blok, renderRichText, blokResolvers, storyblokEditable } = this.props
    return (
      <Content
        textAlign={blok.text_align}
        textColor={blok.text_color?.currentColor}
        {...storyblokEditable(blok)}
      >
        {renderRichText(blok.content, {
          blokResolvers,
        })}
      </Content>
    )
  }
}

export default Content
