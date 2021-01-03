import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import conn from './connection.js';
import styles from './css/app.module.css';
import List from './list/List.jsx';
import Map from './map/Map.jsx';

function App() {
  const [youreHere, setYoureHere] = useState({x: 0, y: 0});
  const [location, setLocation] = useState({id: 1, loc_name: '', size_x: 0, size_y: 0});
  const [page, setPage] = useState(0);
  const [chosenItems, setChosenItems] = useState([]);
  const [items, setItems] = useState([]);
  const [stairs, setStairs] = useState([]);

  function getItems() {
    axios.get(`${conn.path}/api/location/${location.id}/items`).then((res) => {
      // get id by coordinates
      if (res.data.length > 0) {
        return res.data;
      } else {
        throw 'No data';
      }
    }).then(items => {
      setItems(items);
    }).catch(err => {
      console.log(err);
    });
  }

  function getStairs() {
    axios.get(`${conn.path}/api/stairs/${location.id}`).then((res) => {
      if (res.data.length > 0) {
        return res.data;
      } else {
        throw 'No data';
      }
    }).then((stairs) => {
      console.log('stairs: ', stairs);
      setStairs(stairs);
      return;
    }).catch(err => {});
  }

  function addChosenItem (item_id) {
    const getDistance = function(xA, yA, xB, yB) {
      const xDiff = (xA - xB);
      const yDiff = (yA - yB);
      return Math.sqrt((xDiff * xDiff) + (yDiff * yDiff));
    };

    let newChosenItems;
    if (chosenItems.length <= 0) {
      newChosenItems = [];
    } else {
      newChosenItems = [...chosenItems];
    }

    for (let i = 0; i < items.length; i++) {
      if (items[i].id === item_id) {
        newChosenItems.push(items[i]);
        break;
      }
    }

    // sort to closest. we dont know the paths yet
    newChosenItems.sort((a, b) => {
      const distanceA = getDistance(a.x, a.y, youreHere.x, youreHere.y);
      const distanceB = getDistance(b.x, b.y, youreHere.x, youreHere.y);
      return distanceA - distanceB;
    });

    setChosenItems(newChosenItems);
  }

  function removeChosenItem(item_id) {
    const newChosenItems = [...chosenItems];
    for (let i = 0; i < newChosenItems.length; i++) {
      if (newChosenItems[i].id === item_id) {
        newChosenItems.splice(i, 1);
        setChosenItems(newChosenItems);
      }
    }
  }

  function getLocation() {
    axios.get(`${conn.path}/api/location/${location.id}`).then((res) => {
      setYoureHere({x: res.data[0].start_x, y: res.data[0].start_y});
      setLocation(res.data[0]);
    }).catch(err => {
      console.log(err);
    });
  }

  function changePage(pageId) {
    setPage(pageId);

    if (pageId === 0) {
      setYoureHere({x: 0, y: 0}); // TODO: allow sql to store this info
    }
  }

  function getPage(pageId) {
    switch (pageId) {
      case 0:
        return (<List location={location} changePage={changePage} addChosenItem={addChosenItem} removeChosenItem={removeChosenItem} chosenItems={chosenItems} items={items}/>);
      break;
      case 1:
        return (<Map location={location} changePage={changePage} chosenItems={chosenItems} setYoureHere={setYoureHere} youreHere={youreHere} stairs={stairs}/>);
      break;
      default:
        return (<div></div>);
      break;
    }
  }

  useEffect(() => {
    getLocation();
    getItems();
    getStairs();
  }, []);

  return (
    <div>
      <h1>{location.loc_name}</h1>
      <div className={styles.app}>
        {getPage(page)}
      </div>
    </div>
  );
}

export default App;