import React, { useState, useEffect } from 'react';
import axios from 'axios';
import conn from '../connection.js';
import TemplateStyles from './css/template.literals.js';

function Block(props) {
  const [id, setId] = useState(null);
  const [items, setItems] = useState([]);
  const tempLitStyles = new TemplateStyles();

  function getBlockData() {
    axios.get(`${conn.path}/api/blocks/${props.location.id}/${props.x}/${props.y}/${props.currentFloor}`).then((res) => {
      // get id by coordinates
      if (res.data.length > 0) {
        return res.data[0].id;
      } else {
        throw 'No data';
      }
    }).then((blockId) => {
      setId(blockId);

      // get items by id
      return axios.get(`${conn.path}/api/blocks/items/${blockId}`);
    }).then((items) => {
      if (items.data.length > 0) {
        setItems(items.data);
      } else {
        throw 'No items';
      }
    }).catch(err => {
      setId(null);
      setItems([]);
    });
  }

  function getVisualBlock() {
    // check if this should be highlighted
    let isPath = false;
    for (let i = 0; i < props.path.length; i++) {
      if (props.path[i].x === props.x && props.path[i].y === props.y) {
        isPath = true;
        break;
      }
    }

    if (id !== null) {;
      // where the item is
        if (props.path.length > 0) {
          const itemBlock = props.path[props.path.length - 1];
          if (itemBlock.x === props.x && itemBlock.y === props.y) {
            return (<div style={tempLitStyles.itemHereStyle} onMouseEnter={mouseOver} onMouseLeave={mouseOut}></div>);
          }
        }

        // any other unwalkable area
        return (<div style={tempLitStyles.unwalkableStyle} onMouseEnter={mouseOver} onMouseLeave={mouseOut}></div>);
    } else {
      if (props.x === props.youreHere.x && props.y === props.youreHere.y) {
        // youre here
        return (<div style={tempLitStyles.youreHereStyle}></div>);
      } else if (isPath) {
        // walkable path
        return (<div style={tempLitStyles.walkablePathStyle}></div>);
      } else {
        // regular empty space
        return (<div style={tempLitStyles.emptySpaceStyle}></div>);
      }
    }
  }

  function mouseOver() {
    if (items.length <= 0) {
      return;
    }

    // build msg
    const maxItems = 5;
    let msg = '';
    for (let i = 0; i < items.length && i < maxItems; i++) {
      msg += `${items[i].info}. `;
    }

    props.setHint(true, props.x, props.y, msg);
  }

  function mouseOut() {
    props.setHint(false, 0, 0, '');
  }

  useEffect(() => {
    getBlockData();
  }, [props.currentFloor]);

  return (
    <div style={tempLitStyles.mapBlock}>
      {getVisualBlock()}
    </div>
  );
}

export default Block;