import React from 'react';
import styles from './css/list.module.css';

function AvailableItemsList(props) {
  const handleSubmit = () => {
    const item_id = Number(document.getElementById('items').value);
    props.addChosenItem(item_id);
  };

  return (
    <div className={styles.availableItemsList}>
      <h2>Available Items</h2>
      <button onClick={handleSubmit} className={styles.addBtn}>Add</button>
      <select id="items">
        {
          props.items.map((item, index) => {
            return <option value={item.id} key={index}>{item.info}</option>;
          })
        }
      </select>
    </div>
  );
}

export default AvailableItemsList;