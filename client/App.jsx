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
      youreHere: {x: 0, y: 0},
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
    this.removeChosenItem = this.removeChosenItem.bind(this);
    this.setYoureHere = this.setYoureHere.bind(this);
  }

  setYoureHere(x, y) {
    this.setState({youreHere: {x: x, y: y}});
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
    const getDistance = function(xA, yA, xB, yB) {
      const xDiff = (xA - xB);
      const yDiff = (yA - yB);
      return Math.sqrt((xDiff * xDiff) + (yDiff * yDiff));
    };

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

    // sort to closest. we dont know the paths yet
    newChosenItems.sort((a, b) => {
      const distanceA = getDistance(a.x, a.y, this.state.youreHere.x, this.state.youreHere.y);
      const distanceB = getDistance(b.x, b.y, this.state.youreHere.x, this.state.youreHere.y);
      return distanceA - distanceB;
    });

    this.setState({chosenItems: newChosenItems});
  }

  // removes item based on the id (database record id, not index) relevant to the item
  removeChosenItem(item_id) {
    const newChosenItems = [...this.state.chosenItems];
    for (let i = 0; i < newChosenItems.length; i++) {
      if (newChosenItems[i].id === item_id) {
        newChosenItems.splice(i, 1);
        this.setState({chosenItems: newChosenItems});
      }
    }
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

    if (pageId === 0) {
      this.setYoureHere(0, 0);
    }
  }

  getPage(pageId) {
    switch (pageId) {
      case 0:
        return (<List location={this.state.location} changePage={this.changePage} addChosenItem={this.addChosenItem} removeChosenItem={this.removeChosenItem} chosenItems={this.state.chosenItems} items={this.state.items}/>);
      break;
      case 1:
        return (<Map location={this.state.location} changePage={this.changePage} chosenItems={this.state.chosenItems} setYoureHere={this.setYoureHere} youreHere={this.state.youreHere}/>);
      break;
      default:
        return (<div></div>);
      break;
    }
  }

  render() {
    return (
      <div>
        <h1>{this.state.location.loc_name}</h1>
        <div className={styles.app}>
          {this.getPage(this.state.page)}
        </div>
      </div>
    );
  }
}

export default App;