import PropTypes from 'prop-types'
import React from 'react'
import ChosenItem from './ChosenItem.jsx'
import styles from './css/list.module.css'

function ChosenItems (props) {
  function getHeader () {
    let header = (<span></span>)
    if (props.chosenItems.length > 0) {
      header = (<h2>Chosen Items</h2>)
    }
    return header
  }

  return (
      <div className={styles.chosenItems}>
        {getHeader()}
        <ul>
          {
            props.chosenItems.map((item, index) => {
              return <li key={index}><ChosenItem item={item} removeChosenItem={props.removeChosenItem}/></li>
            })
          }
        </ul>
      </div>
  )
}

ChosenItems.propTypes = {
  chosenItems: PropTypes.array,
  removeChosenItem: PropTypes.object
}

export default ChosenItems
