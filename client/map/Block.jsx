import React from 'react';
import axios from 'axios';

import conn from '../connection.js';
import styles from './css/block.module.css'

class Block extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      x: this.props.x,
      y: this.props.y,
      id: null,
      items: []
    };

    this.getId = this.getId.bind(this);
    this.getItems = this.getItems.bind(this);
    this.getBlockData = this.getBlockData.bind(this);
    this.getVisualBlock = this.getVisualBlock.bind(this);
  }

  getId() {
    return this.state.id;
  }

  getItems() {
    return this.state.items;
  }

  getIsWalkable() {
    if (this.state.id === null) {
      return true;
    } else {
      return false;
    }
  }

  getCoordinates() {
    return {x: this.state.x, y: this.state.y};
  }

  getBlockData() {
    axios.get(`${conn.path}/api/blocks/${this.props.location.id}/${this.state.x}/${this.state.y}`).then((res) => {
      // get id by coordinates
      if (res.data.length > 0) {
        return res.data[0].id;
      } else {
        throw 'No data';
      }
    }).then((blockId) => {
      this.setState({id: blockId});

      // get items by id
      return axios.get(`${conn.path}/api/blocks/${blockId}/items`);
    }).then((items) => {
      if (items.data.length > 0) {
        this.setState({items: items.data})
      } else {
        throw 'No items';
      }
    }).catch(err => {});
  }

  getVisualBlock() {
    // check if this should be highlighted
    let isPath = false;
    for (let i = 0; i < this.props.path.length; i++) {
      if (this.props.path[i].x === this.state.x && this.props.path[i].y === this.state.y) {
        isPath = true;
        break;
      }
    }

    if (this.state.id !== null) {
      return (<div className={styles.mapBlockUnwalkable}></div>);
    } else {
      if (this.props.x === this.props.youreHere.x && this.props.y === this.props.youreHere.y) {
        return (<div className={styles.youreHere}></div>);
      } else if (isPath) {
        return (<div className={styles.mapBlockPath}></div>);
      } else {
        return (<div className={styles.mapBlockWalkable}></div>);
      }
    }
  }

  render() {
    if (this.state.id === null) {
      this.getBlockData();
    }

    return (
      <div className={styles.mapBlock}>
        {this.getVisualBlock()}
      </div>
    );
  }
}

export default Block;