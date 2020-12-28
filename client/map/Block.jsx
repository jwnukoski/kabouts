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

    this.mouseOut = this.mouseOut.bind(this);
    this.mouseOver = this.mouseOver.bind(this);
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

    if (this.state.id !== null) {;
      // where the item is
        if (this.props.path.length > 0) {
          const itemBlock = this.props.path[this.props.path.length - 1];
          if (itemBlock.x === this.state.x && itemBlock.y === this.state.y) {
            return (<div className={styles.itemHere} onMouseEnter={this.mouseOver} onMouseLeave={this.mouseOut}>X</div>);
          }
        }

        // any other unwalkable area
        return (<div className={styles.mapBlockUnwalkable} onMouseEnter={this.mouseOver} onMouseLeave={this.mouseOut}></div>);
    } else {
      if (this.props.x === this.props.youreHere.x && this.props.y === this.props.youreHere.y) {
        // youre here
        return (<div className={styles.youreHere}>You're here</div>);
      } else if (isPath) {
        // walkable path
        return (<div className={styles.mapBlockPath}></div>);
      } else {
        // regular empty space
        return (<div className={styles.mapBlockWalkable}></div>);
      }
    }
  }

  mouseOver() {
    if (this.state.items.length <= 0) {
      return;
    }

    // build msg
    const maxItems = 5;
    let msg = '';
    for (let i = 0; i < this.state.items.length && i < maxItems; i++) {
      msg += `${this.state.items[i].info}\n`;
    }

    this.props.setHint(true, this.state.x, this.state.y, msg);
  }

  mouseOut() {
    this.props.setHint(false, 0, 0, '');
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