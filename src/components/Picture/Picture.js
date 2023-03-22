import styled from 'styled-components'
import PictureSource from '@/components/PictureSource/PictureSource'

const Picture = styled.picture`
display: flex;
width: 100%;

img {
  height: auto;
  width: 100%;
}
`

export default ({ blok, storyblokEditable }) => {
  return (
    <Picture {...storyblokEditable(blok)}>
      {blok.sources ? 
        blok.sources.map((source, index) => (
          <PictureSource blok={source} key={index} />
        ))
        : null
      }
      {
        blok.fallback_img ? (
          <img src={blok.fallback_img.filename} alt={blok.fallback_img.alt} />
        ) : null
      }  
    </Picture>
  )
}
