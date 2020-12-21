import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import conn from '../connection.js';
import AvailableItemsList from './AvailableItemsList.jsx';
import ChosenItems from './ChosenItems.jsx';
import styles from './css/list.module.css';

// component did mount
class List extends React.Component {
  constructor(props) {
    super(props);

    this.getDoneBtn = this.getDoneBtn.bind(this);
    this.handleDoneClick = this.handleDoneClick.bind(this);
  }

  handleDoneClick() {
    this.props.changePage(1);
  }

  getDoneBtn() {
    if (this.props.chosenItems.length > 0) {
      return (<button onClick={this.handleDoneClick}>To Map</button>);
    } else {
      return (<div></div>);
    }
  }

  render() {
    return (
      <div className={styles.list}>
        <AvailableItemsList items={this.props.items} addChosenItem={this.props.addChosenItem}/>
        <ChosenItems chosenItems={this.props.chosenItems}/>
        {this.getDoneBtn()}
      </div>
    );
  }
}

export default List;