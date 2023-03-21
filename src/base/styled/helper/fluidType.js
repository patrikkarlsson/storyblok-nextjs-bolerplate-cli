export const getUnit = (val) => {
  const textRegex = /[^0-9\.]+/g
  const result = textRegex.exec(val).join()
  return result
};

export const getValue = (val) => {
  const numRegex = /^\D+/g
  const result = parseFloat(val.replace(numRegex, ""))
  return result
};


export const calcInterpolation = (minVW, maxVW, minFontSize, maxFontSize) => {
  const u1 = getUnit(minVW)
  const u2 = getUnit(maxVW)
  const u3 = getUnit(minFontSize)
  const u4 = getUnit(maxFontSize)

  if (u1 === u2 && u3 === u4 && u1 === u3) {
    const minScreen = getValue(minVW);
    const maxScreen = getValue(maxVW);
    const minValue = getValue(minFontSize);
    const maxValue = getValue(maxFontSize);

    return `calc(${minFontSize} + ${maxValue - minValue} * ((100vw - ${minVW}) / ${maxScreen - minScreen}));`
  } else {
    throw new Error(`Please use the same units (px/em/rem/etc)\n${u1} from ${minVW}, ${u2} from ${maxVW}, ${u3} from ${minFontSize}, ${u4} from ${maxFontSize}`)
  }
}

export const fluidType = (property, minVW, maxVW, minFontSize, maxFontSize) => {
  const result = `
    ${property}: ${minFontSize};
    @media screen and (min-width: ${minVW}) {
      ${property}: ${calcInterpolation(minVW, maxVW, minFontSize, maxFontSize)};
    }
    @media screen and (min-width: ${maxVW}) {
      ${property}: ${maxFontSize};
    }
  `
  return result
}