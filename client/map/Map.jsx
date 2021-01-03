import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {astar, Graph} from './astar.js';
import styles from './css/map.module.css'
import conn from '../connection.js';
import Block from './Block.jsx';
import PathList from './PathList.jsx';
import Hint from './Hint.jsx';
import FloorChanger from './FloorChanger.jsx';

function Map(props) {
  const [path, setPath] = useState([]);
  const [currentItem, setCurrentItem] = useState(-1);
  const [hint, setHint] = useState({x: 0, y: 0, msg: '', visible: false});
  const [binaryMap, setBinaryMap] = useState([]);
  const [currentFloor, setFloor] = useState(0);
  const [topFloor, setTopFloor] = useState(0);

  function changeFloor(up = true) {
    if ((currentFloor < topFloor && up) || (currentFloor > 0 && !up)) {
      let floor = currentFloor;

      if (up) {
        floor++;
      } else {
        floor--;
      }

      getBinaryMap(floor, () => {
        createMap(floor, () => {
          setFloor(floor);
        });
      });

      return true;
    }
    return false;
  }

  function nextItem() {
    // goes to next item on the list and finds its path
    if (currentItem < (props.chosenItems.length - 1)) {
      const currItem = (currentItem + 1);

      // update youre here to last location
      let lastGrid;
      if (path.length <= 1) {
        lastGrid = props.youreHere;
      } else {
        // -2 as the last item in path should be an unwalkable area
        lastGrid = path[path.length - 2];
      }

      const newX = lastGrid.x;
      const newY = lastGrid.y;

      const newPath = getPath(newX, newY, props.chosenItems[currItem].x, props.chosenItems[currItem].y);

      props.setYoureHere({x: newX, y: newY});
      setCurrentItem(currItem);
      setPath(newPath);
    }
  }

  function getPath(startX, startY, targetX, targetY) {
    // finds and returns grid elements to location
    const graph = binaryMap;
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

  function createMap(floor = currentFloor, callback = (() => {})) {
    // returns visual blocks
    const mapX = props.location.size_x;
    const mapY = props.location.size_y;
    const map = [];

    for (let y = 0; y < mapY; y++) {
      const rowChildren = [];

      for (let x = 0; x < mapX; x++) {
        const block = (<Block x={x} y={y} location={props.location} youreHere={props.youreHere} path={path} setHint={changeHint} currentFloor={currentFloor} stairs={props.stairs}/>);
        rowChildren.push(block);
      }

      map.push(<div className={styles.mapRow}>{rowChildren}</div>);
    }

    callback();
    return map;
  }

  function getBinaryMap(floor = currentFloor, callback = (()=>{})) {
    // for astar path finding
    let newBinaryMap = [];
    const mapX = props.location.size_x;
    const mapY = props.location.size_y;

    for (let y = 0; y < mapY; y++) {
      let row = [];
      for (let x = 0; x < mapX; x++) {
        row.push(1);
      }
      newBinaryMap[y] = row;
    }

    axios.get(`${conn.path}/api/blocks/level/${props.location.id}/${floor}`).then((res) => {
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

        if (newBinaryMap[x][y] !== undefined) {
          newBinaryMap[x][y] = 0;
        }
      }

      return;
    }).then(() => {
      callback();
      setBinaryMap(new Graph(newBinaryMap));
    }).catch(err => {});
  }

  function changeHint(visible = hint.visible, x = hint.x, y = hint.y, msg = hint.msg) {
    const newX = x;
    const newY = y;
    const newMsg = msg;
    const newVisible = visible;

    const currentX = hint.x;
    const currentY = hint.y;
    const currentMsg = hint.msg;
    const currentVisible = hint.visible;

    // only update if theres a change
    if (newX !== currentX || newY !== currentY || newMsg !== currentMsg || currentVisible !== currentVisible) {
      setHint({x: newX, y: newY, msg: newMsg, visible: newVisible});
    }
  }

  function getTopFloor() {
    axios.get(`${conn.path}/api/location/${props.location.id}/lvls`).then((res) => {
      if (res.data.length > 0) {
        return res.data;
      } else {
        throw 'No data';
      }
    }).then((topFloor) => {
      setTopFloor(topFloor[0].lvl);
    }).catch(err => {});
  }

  useEffect(() => {
    getTopFloor();
    getBinaryMap();
  }, []);

  return (
    <div>
      <Hint data={hint}/>
      <div className={styles.map}>
        {createMap()}
      </div>
      <PathList chosenItems={props.chosenItems} currentItem={currentItem} nextItem={nextItem} changePage={props.changePage} changeFloor={changeFloor}/>
      <FloorChanger changeFloor={changeFloor} currentFloor={currentFloor}/>
    </div>
  );
}

export default Map;