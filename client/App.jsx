import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import conn from './connection.js';
import styles from './css/app.module.css';

import List from './list/List.jsx';
import Map from './map/Map.jsx';

// component did mount
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      location: {id: 1, loc_name: '', size_x: 0, size_y: 0},
      page: 0,
      chosenItems: [],
      items: []
    };

    this.getLocation = this.getLocation.bind(this);
    this.getLocation();
    this.getItems = this.getItems.bind(this);
    this.getItems();
    this.addChosenItem = this.addChosenItem.bind(this);
    this.getPage = this.getPage.bind(this);
    this.changePage = this.changePage.bind(this);
  }

  getItems() {
    axios.get(`${conn.path}/api/location/${this.state.location.id}/items`).then((res) => {
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

  addChosenItem(item_id) {
    let newChosenItems;
    if (this.state.chosenItems.length <= 0) {
      newChosenItems = [];
    } else {
      newChosenItems = [...this.state.chosenItems];
    }

    for (let i = 0; i < this.state.items.length; i++) {
      if (this.state.items[i].id === item_id) {
        newChosenItems.push(this.state.items[i]);
        break;
      }
    }

    this.setState({chosenItems: newChosenItems});
  }

  getLocation() {
    axios.get(`${conn.path}/api/location/${this.state.location.id}`).then((res) => {
      this.setState({location: res.data[0]});
    }).catch(err => {
      console.log(err);
    });
  }

  changePage(pageId) {
    this.setState({page: pageId});
  }

  getPage(pageId) {
    switch (pageId) {
      case 0:
        return (<List location={this.state.location} changePage={this.changePage} addChosenItem={this.addChosenItem} chosenItems={this.state.chosenItems} items={this.state.items}/>);
      break;
      case 1:
        return (<Map location={this.state.location} changePage={this.changePage} chosenItems={this.state.chosenItems}/>);
      break;
      default:
        return (<div></div>);
      break;
    }
  }

  render() {
    return (
      <div className={styles.app}>
        <h1>{this.state.location.loc_name}</h1>
        {this.getPage(this.state.page)}
      </div>
    );
  }
}

export default App;