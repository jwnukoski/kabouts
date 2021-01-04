import PropTypes from 'prop-types'
import React from 'react'
import styles from './css/floorchanger.module.css'

function FloorChanger (props) {
  function handleUpClick () {
    props.changeFloor(true)
  }

  function handleDownClick () {
    props.changeFloor(false)
  }

  return (
    <div className={styles.floorChangerWrapper}>
      <p>Current floor: {props.currentFloor}</p>
      <button onClick={handleUpClick}>Up</button>
      <button onClick={handleDownClick}>Down</button>
    </div>
  )
}

FloorChanger.propTypes = {
  changeFloor: PropTypes.func,
  currentFloor: PropTypes.number
}

export default FloorChanger
