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
      chosenItems: []
    };

    this.getLocation = this.getLocation.bind(this);
    this.getLocation();
    this.getPage = this.getPage.bind(this);
    this.changePage = this.changePage.bind(this);
    this.setChosenItems = this.setChosenItems.bind(this);
  }

  setChosenItems(items) {
    this.setState({chosenItems: items});
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
        return (<List location={this.state.location} changePage={this.changePage} setChosenItems={this.setChosenItems}/>);
      break;
      case 1:
        return (<Map location={this.state.location} changePage={this.changePage}/>);
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