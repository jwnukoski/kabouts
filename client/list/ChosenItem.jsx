import PropTypes from 'prop-types'
import React from 'react'
import styles from './css/list.module.css'

function ChosenItem (props) {
  function handleDeleteClick (e) {
    props.removeChosenItem(props.item.id)
  }

  return (
    <div className={styles.chosenItems}>
      <button className={styles.deleteBtn} onClick={handleDeleteClick}>X</button>{props.item.info}
    </div>
  )
}

ChosenItem.propTypes = {
  removeChosenItem: PropTypes.func,
  item: PropTypes.object
}

export default ChosenItem
