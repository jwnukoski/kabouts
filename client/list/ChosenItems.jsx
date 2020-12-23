import React from 'react';
import ReactDOM from 'react-dom';

import ChosenItem from './ChosenItem.jsx';
import styles from './css/list.module.css';

// component did mount
class ChosenItems extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let header = (<span></span>);
    if (this.props.chosenItems.length > 0) {
      header = (<h2>Chosen Items</h2>);
    }

    return (
      <div className={styles.chosenItems}>
        {header}
        <ul>
          {
            this.props.chosenItems.map((item, index) => {
              return <li key={index}><ChosenItem item={item} removeChosenItem={this.props.removeChosenItem}/></li>
            })
          }
        </ul>
      </div>

    );
  }
}

export default ChosenItems;