class DynamicComponent {
  constructor(components, renderRichText, blokResolvers, storyblokEditable) {
    this.renderRichText = renderRichText
    this.blokResolvers = blokResolvers,
    this.components = components
    this.storyblokEditable = storyblokEditable
  }

  render(blok, key) {
    if (typeof this.localComponents[blok.component] !== 'undefined') {
      const Component = this.localComponents[blok.component]
    
      return (
        <Component
          storyblokEditable={this.storyblokEditable}
          blokResolvers={this.blokResolvers}
          key={key}
          renderRichText={this.renderRichText}
          blok={blok}
        >
          {blok.body ?
            blok.body.map((b) => {
              return this.render(b, b._uid)
            })
            : null
          }
        </Component>
      )
    }
  }
}

export default DynamicComponent