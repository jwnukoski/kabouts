import React from 'react';
import axios from 'axios';
import {astar, Graph} from './astar.js';
import styles from './css/map.module.css'
import conn from '../connection.js';
import Block from './Block.jsx';
import PathList from './PathList.jsx';
import Hint from './Hint.jsx';

class Map extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      path: [],
      currentItem: -1,
      hint: {x: 0, y: 0, msg: '', visible: false}
    };

    this.pathed = false; // test only
    this.createMap = this.createMap.bind(this);
    this.getPath = this.getPath.bind(this);
    this.getBinaryMap = this.getBinaryMap.bind(this);
    this.nextItem = this.nextItem.bind(this);
    this.setHint = this.setHint.bind(this);

    // for path finding, only needs to currently run once
    this.binaryMap = this.getBinaryMap();
  }

  nextItem() {
    // goes to next item on the list and finds its path
    if (this.state.currentItem < (this.props.chosenItems.length - 1)) {
      const currItem = (this.state.currentItem + 1);

      // update youre here to last location
      let lastGrid;
      if (this.state.path.length <= 1) {
        lastGrid = this.props.youreHere;
      } else {
        // -2 as the last item in path should be an unwalkable area
        lastGrid = this.state.path[this.state.path.length - 2];
      }

      const newX = lastGrid.x;
      const newY = lastGrid.y;

      const newPath = this.getPath(newX, newY, this.props.chosenItems[currItem].x, this.props.chosenItems[currItem].y);

      this.props.setYoureHere(newX, newY);
      this.setState({currentItem: currItem,
        path: newPath
      });
    }
  }

  getPath(startX, startY, targetX, targetY) {
    // finds and returns grid elements to location
    const graph = this.binaryMap;
    const start = graph.grid[startX][startY];
    const itemBlock = graph.grid[targetX][targetY];

    // find nearest open square if the target location is not walkable. astar wont work if destination is not walkable
    if (graph.grid[targetX][targetY].weight !== 1) {
      if (graph.grid[targetX][targetY - 1].weight === 1) {
        targetY -= 1;
      } else if (graph.grid[targetX][targetY + 1].weight === 1) {
        targetY += 1;
      } else if (graph.grid[targetX - 1][targetY].weight === 1) {
        targetX -= 1;
      } else if (graph.grid[targetX + 1][targetY].weight === 1) {
        targetX += 1;
      }
    }

    const end = graph.grid[targetX][targetY];
    const result = astar.search(graph, start, end);

    // add the original item location for highlighting later
    result.push(itemBlock);

    return result;
  }

  createMap() {
    // returns visual blocks
    const mapX = this.props.location.size_x;
    const mapY = this.props.location.size_y;
    const map = [];

    for (let y = 0; y < mapY; y++) {
      const rowChildren = [];

      for (let x = 0; x < mapX; x++) {
        const block = (<Block x={x} y={y} location={this.props.location} youreHere={this.props.youreHere} path={this.state.path} setHint={this.setHint}/>);
        rowChildren.push(block);
      }

      map.push(<div className={styles.mapRow}>{rowChildren}</div>);
    }

    return map;
  }

  getBinaryMap() {
    // for astar path finding
    let binaryMap = [];
    const mapX = this.props.location.size_x;
    const mapY = this.props.location.size_y;

    for (let y = 0; y < mapY; y++) {
      let row = [];
      for (let x = 0; x < mapX; x++) {
        row.push(1);
      }
      binaryMap[y] = row;
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

        if (binaryMap[x][y] !== undefined) {
          binaryMap[x][y] = 0;
        }
      }

      return;
    }).then(() => {
      this.binaryMap = new Graph(binaryMap);
    }).catch(err => {});
  }

  setHint(visible = this.state.hint.visible, x = this.state.hint.x, y = this.state.hint.y, msg = this.state.hint.msg) {
    const newX = x;
    const newY = y;
    const newMsg = msg;
    const newVisible = visible;

    const currentX = this.state.hint.x;
    const currentY = this.state.hint.y;
    const currentMsg = this.state.hint.msg;
    const currentVisible = this.state.hint.visible;

    // only update if theres a change
    if (newX !== currentX || newY !== currentY || newMsg !== currentMsg || currentVisible !== currentVisible) {
      this.setState({hint: {x: newX, y: newY, msg: newMsg, visible: newVisible}});
    }
  }

  render() {
    return (
      <div>
        <Hint data={this.state.hint}/>
        <div className={styles.map}>
          {this.createMap()}
        </div>
        <PathList chosenItems={this.props.chosenItems} currentItem={this.state.currentItem} nextItem={this.nextItem} changePage={this.props.changePage}/>
      </div>
    );
  }
}

export default Map;