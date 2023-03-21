import styled, { css } from 'styled-components'
import React, { Component } from 'react'

class Page extends Component {

  constructor() {
    super()

    this.element = styled.main`
      ${() => css`
        display: flex;
        width: 100%;
        flex-direction: column;
      `}
    `
  }

  render() {
    const Page = this.element
    const { blok, storyblokEditable } = this.props
    return (
      <Page {...storyblokEditable(blok)} key={blok._uid}>
        {this.props.children}
      </Page>
    )
  }
}

export default Page
