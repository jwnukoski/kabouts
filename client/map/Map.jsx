import React from 'react';
import axios from 'axios';

import styles from './css/map.module.css'
import conn from '../connection.js';

import Block from './Block.jsx';

class Map extends React.Component {
  constructor(props) {
    super(props);

    // for path finding
    this.binaryMap = [];

    this.state = {
      youreHere: {x: 0, y: 0},
    }

    this.createMap = this.createMap.bind(this);
    this.getPath = this.getPath.bind(this);
    this.getBinaryMap = this.getBinaryMap.bind(this);
  }

  getPath() {
    const startX = this.state.youreHere.x;
    const startY = this.state.youreHere.y;
    // test
    const destX = 3;
    const destY = 3;


  }

  createMap() {
    const mapX = this.props.location.size_x;
    const mapY = this.props.location.size_y;
    const map = [];

    for (let y = 0; y < mapY; y++) {
      const rowChildren = [];

      for (let x = 0; x < mapX; x++) {
        const block = (<Block x={x} y={y} location={this.props.location} youreHere={this.state.youreHere}/>);
        rowChildren.push(block);
      }

      map.push(<div className={styles.mapRow}>{rowChildren}</div>);
    }

    return map;
  }

  getBinaryMap() {
    // for path finding
    let binaryMap = [];
    const mapX = this.props.location.size_x;
    const mapY = this.props.location.size_y;

    for (let y = 0; y < mapY; y++) {
      let row = [];
      for (let x = 0; x < mapX; x++) {
        row.push({walkable: true, x: x, y: y});
      }
      binaryMap.push(row);
    }


    axios.get(`${conn.path}/api/blocks/${this.props.location.id}`).then((res) => {
      // get id by coordinates
      if (res.data.length > 0) {
        return res.data;
      } else {
        throw 'No data';
      }
    }).then((unwalkableBlocks) => {
      // set unwalkables
      for (let i = 0; i < unwalkableBlocks.length; i++) {
        const x = unwalkableBlocks[i].x;
        const y = unwalkableBlocks[i].y;

        if (binaryMap[y][x] !== undefined) {
          binaryMap[y][x].walkable = false;
        }
      }

      return;
    }).then(() => {
      this.binaryMap = binaryMap;
      this.getPath();
    }).catch(err => {});
  }

  render() {
    console.log('render');
    if (!this.pathed) {

      this.getBinaryMap();
    }

    return (
      <div className={styles.map}>
        {this.createMap()}
      </div>
    );
  }
}

export default Map;