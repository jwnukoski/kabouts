import React from 'react';
import styles from './css/list.module.css';

function ChosenItem(props) {
  function handleDeleteClick(e) {
    this.props.removeChosenItem(this.props.item.id);
  }

  return (
    <div className={styles.chosenItems}>
      <button className={styles.deleteBtn} onClick={handleDeleteClick}>X</button>{props.item.info}
    </div>
  );
}

export default ChosenItem;