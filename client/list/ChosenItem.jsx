import React from 'react';
import ReactDOM from 'react-dom';

import styles from './css/list.module.css';

// component did mount
class ChosenItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }

  handleDeleteClick(e) {
    this.props.removeChosenItem(this.props.item.id);
  }

  render() {
    return (
      <div className={styles.chosenItems}>
        <button className={styles.deleteBtn} onClick={this.handleDeleteClick}>X</button>{this.props.item.info}
      </div>

    );
  }
}

export default ChosenItem;