import PropTypes from 'prop-types'
import React from 'react'
import TemplateStyles from './css/template.literals.js'

function Hint (props) {
  const tempLitStyles = new TemplateStyles()

  function getBlock () {
    if (props.data.visible) {
      return <div>
        {props.data.msg}
      </div>
    } else {
      return <span></span>
    }
  }

  function getHintStyle () {
    let hintStyle = tempLitStyles.hintStyleHidden

    if (props.data.visible) {
      hintStyle = tempLitStyles.hintStyleVisible

      const coordinates = {
        left: `${(props.data.x * tempLitStyles.tileSize)}px`,
        top: `${(props.data.y * tempLitStyles.tileSize)}px`
      }

      Object.assign(hintStyle, coordinates)
    }

    return hintStyle
  }

  return (
    <div style={getHintStyle()}>
      {getBlock()}
    </div>
  )
}

Hint.propTypes = {
  data: PropTypes.array
}

export default Hint
