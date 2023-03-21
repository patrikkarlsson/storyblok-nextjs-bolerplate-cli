import { fluidType } from './helper/fluidType'

export const generateFontNames = ({ headline, body }) => {
  return {
    headline,
    body
  }
}

export const generateFontFaces = ({ name, filePath, weight, style }) => {
  return {
    name,
    filePath,
    weight,
    style
  }
}

export const generateMQ = ({ mobile, tablet, laptop, desktop, widescreen }) => {
  return {
    mobile,
    tablet,
    laptop,
    desktop,
    widescreen,
  }
}

export const generateSpacing = ({min, max}) => {
  return {
    min,
    max,
  }
}

export const generateColors = (colors) => {
  return colors
}

export const generateTypographySettings = ({ minSize, maxSize, minLineHeight, maxLineHeight, letterSpacing, weight }) => {
  return {
    minSize,
    maxSize,
    minLineHeight,
    maxLineHeight,
    letterSpacing,
    weight,
  }
}

export const DefaultTheme = ({ maxWidth = '120rem', spacing, fontNames, mq, colors, typography, typographySpacing }) => {

  const currentFontNames = !fontNames ? generateFontNames({ headline: 'Playfair Display', body: 'Roboto' }) : fontNames

  const currentFontFamilies = {
    headline: `"${currentFontNames.headline}", Serif`,
    body: `${currentFontNames.body}, sans-serif`,
  }

  const currentMQ = !mq ? generateMQ({ mobile: '43rem', tablet: '62rem', laptop: '82rem', desktop: '120rem' }) : mq

  const currentSpacing = !spacing ? generateSpacing({ min: '2rem', max: '' }) : spacing

  const currentTypographySpacing = !typographySpacing ? generateSpacing({ min: '1.25rem', max: '2rem' }) : typographySpacing

  const currentColors = !colors ? generateColors({}) : colors

  const currentTypography = !typography ? {
    h1: generateTypographySettings({ minSize: '2.125rem', maxSize: '3.5rem', minLineHeight: '2.5rem', maxLineHeight: '3.875rem', letterSpacing: 0, weight: 700 }),
    h2: generateTypographySettings({ minSize: '1.625rem', maxSize: '3rem', minLineHeight: '1.375rem', maxLineHeight: '3.375rem', letterSpacing: 0, weight: 700 }),
    h3: generateTypographySettings({ minSize: '1.5rem', maxSize: '2.5rem', minLineHeight: '1.875rem', maxLineHeight: '2.875rem', letterSpacing: 0, weight: 700 }),
    h4: generateTypographySettings({ minSize: '1.25rem', maxSize: '2.125rem', minLineHeight: '1.625rem', maxLineHeight: '2.5rem', letterSpacing: 0, weight: 700 }),
    h5: generateTypographySettings({ minSize: '1.125rem', maxSize: '1.5rem', minLineHeight: '1.5rem', maxLineHeight: '1.875rem', letterSpacing: 0, weight: 700 }),
    h6: generateTypographySettings({ minSize: '1.125rem', maxSize: '1.5rem', minLineHeight: '1.5rem', maxLineHeight: '1.875rem', letterSpacing: 0, weight: 700 }),
    p: generateTypographySettings({ minSize: '1.125rem', maxSize: '1.125rem', minLineHeight: '1.5rem', maxLineHeight: '1.5rem', letterSpacing: 0, weight: 400 }),
  } : typography

  return {
    maxWidth,
    mq: currentMQ,
    color: currentColors,
    font: {
      names: currentFontNames,
      family: currentFontFamilies,
      typography: currentTypography,
      weight: {
        light: 300,
        normal: 400,
        semimedium: 500,
        medium: 600,
        bold: 700,
      },
    },
    components: [],
    fluidType,
    spacing: (spacing = [], customSpacing = null) => {

      const spacingWidths = customSpacing ? customSpacing : currentSpacing

      const result = `    
        ${spacing.includes('all') ? `
          ${fluidType("padding", currentMQ.mobile, maxWidth, spacingWidths.min, spacingWidths.max)};
        ` : `` }
    
        ${spacing.includes('left') ? `
          ${fluidType("padding-left", currentMQ.mobile, maxWidth, spacingWidths.min, spacingWidths.max)};
        ` : `` }
    
        ${spacing.includes('right') ? `
          ${fluidType("padding-right", currentMQ.mobile, maxWidth, spacingWidths.min, spacingWidths.max)};
        ` : `` }
    
        ${spacing.includes('top') ? `
          ${fluidType("padding-top", currentMQ.mobile, maxWidth, spacingWidths.min, spacingWidths.max)};
        ` : `` }
    
        ${spacing.includes('bottom') ? `
          ${fluidType("padding-bottom", currentMQ.mobile, maxWidth, spacingWidths.min, spacingWidths.max)};
        ` : `` }

        ${spacing.includes('none') ? `
          padding: 0;
        ` : `` }
      `
      return result
    },
    normalize: (fontFaces) => {
      let typographyStyle = ''

      for(const [key, value] of Object.entries(currentTypography)) {
        typographyStyle += `
          ${key} {
            ${fluidType('font-size', currentMQ.mobile, maxWidth, value.minSize, value.maxSize)}
            ${fluidType('line-height', currentMQ.mobile, maxWidth, value.minLineHeight, value.maxLineHeight)}
            letter-spacing: ${value.letterSpacing};
            font-weight: ${value.weight};
          }
        `
      }

      let fontFacesStyle = ''

      if (fontFaces) {
        fontFaces.forEach((font) => {
          fontFacesStyle += `
          @font-face {
            font-family: '${font.name}';
            src: local('${font.name}'), url('${font.filePath}') format("truetype");
            font-weight: ${font.weight};
            font-style: ${font.style};
          }
        `
        })
      }

      const result = `
        html {
          background-color: ${currentColors.background};
          color: ${currentColors.body};
          height: 100%;
          -webkit-overflow-scrolling: touch;
          overflow-scrolling: touch;
        }

        html,
        body {
          margin: 0 !important;
          min-height: 100%;
          height: auto;
          font-family: ${currentFontFamilies.body};
          scroll-behavior: smooth;
        }

        body {
          overflow-y: visible;
          position: relative;
          height: unset;
        }

        * {
          box-sizing: border-box;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          font-variant-ligatures: none;
        }

        img {
          max-width: 100%;
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          font-family: ${currentFontFamilies.headline};
          margin: 0;
          color: inherit;
          font-weight: normal;
        }

        p {
          margin: 0;
        }

        p + p {
          margin-top: calc(${currentTypographySpacing.min});
        }

        h1 + *,
        h2 + *,
        h3 + *,
        h4 + *,
        h5 + *,
        h6 + * {
          margin-top: calc(${currentTypographySpacing.min});
        }
        * + h1,
        * + h2,
        * + h3,
        * + h4,
        * + h5,
        * + h6 {
          margin-top: calc(${currentTypographySpacing.min});
        }
        ${fontFacesStyle}
        ${typographyStyle}
      `
        
      return result
    }
  }
}