import PropTypes from 'prop-types'
import React from 'react'
import AvailableItemsList from './AvailableItemsList.jsx'
import ChosenItems from './ChosenItems.jsx'
import styles from './css/list.module.css'

function List (props) {
  function handleDoneClick () {
    props.changePage(1)
  }

  function getDoneBtn () {
    if (props.chosenItems.length > 0) {
      return (<button className={styles.toMapBtn} onClick={handleDoneClick}>View Map</button>)
    } else {
      return (<div></div>)
    }
  }

  return (
    <div className={styles.list}>
      <AvailableItemsList items={props.items} addChosenItem={props.addChosenItem}/>
      {getDoneBtn()}
      <ChosenItems chosenItems={props.chosenItems} removeChosenItem={props.removeChosenItem}/>
    </div>
  )
}

List.propTypes = {
  chosenItems: PropTypes.array,
  items: PropTypes.array,
  removeChosenItem: PropTypes.func,
  addChosenItem: PropTypes.func,
  changePage: PropTypes.func
}

export default List
