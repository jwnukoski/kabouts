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

    this.state = {
      items: [],
      chosenItems: []
    };

    this.getItems = this.getItems.bind(this);
    this.getItems();
    this.addChosenItem = this.addChosenItem.bind(this);
    this.getDoneBtn = this.getDoneBtn.bind(this);
    this.handleDoneClick = this.handleDoneClick.bind(this);
  }

  addChosenItem(item_id) {
    const chosenItems = [...this.state.chosenItems];

    for (let i = 0; i < this.state.items.length; i++) {
      if (this.state.items[i].id === item_id) {
        chosenItems.push(this.state.items[i]);
        break;
      }
    }

    this.setState({chosenItems: chosenItems});
  }

  getItems() {
    axios.get(`${conn.path}/api/location/${this.props.location.id}/items`).then((res) => {
      // get id by coordinates
      if (res.data.length > 0) {
        return res.data;
      } else {
        throw 'No data';
      }
    }).then(items => {
      this.setState({items: items});
    }).catch(err => {
      console.log(err);
    });
  }

  handleDoneClick() {
    this.props.setChosenItems(this.state.chosenItems);
    this.props.changePage(1);
  }

  getDoneBtn() {
    if (this.state.chosenItems.length > 0) {
      return (<button onClick={this.handleDoneClick}>To Map</button>);
    } else {
      return (<div></div>);
    }
  }

  render() {
    return (
      <div className={styles.list}>
        <AvailableItemsList items={this.state.items} addChosenItem={this.addChosenItem}/>
        <ChosenItems chosenItems={this.state.chosenItems}/>
        {this.getDoneBtn()}
      </div>
    );
  }
}

export default List;