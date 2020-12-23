import React from 'react';
import ReactDOM from 'react-dom';

import styles from './css/list.module.css';

// component did mount
class AvailableItemsList extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    const item_id = Number(document.getElementById('items').value);
    this.props.addChosenItem(item_id);
  }

  render() {
    return (
      <div className={styles.availableItemsList}>
        <h2>Available Items</h2>
        <button onClick={this.handleSubmit} className={styles.addBtn}>Add</button>
        <select id="items">
          {
            this.props.items.map((item, index) => {
              return <option value={item.id} key={index}>{item.info}</option>;
            })
          }
        </select>
      </div>

    );
  }
}

export default AvailableItemsList;