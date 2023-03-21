import cn from 'classnames'
import styled, { css } from 'styled-components'
import React, { Component } from 'react'

class Row extends Component {

  constructor() {
    super()

    this.element = styled.div`
    `
  }

  render() {
    const Row = this.element
    const { blok, storyblokEditable } = this.props
    return (
      <Row {...storyblokEditable(blok)} key={blok._uid} className={cn(blok.style)}>
        {this.props.children}
      </Row>
    )
  }
}

export default Row
