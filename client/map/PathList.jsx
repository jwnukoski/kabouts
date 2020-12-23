import React from 'react';
import styles from './css/pathlist.module.css'

class PathList extends React.Component {
  constructor(props) {
    super(props);
    this.handleNextBtn = this.handleNextBtn.bind(this);
    this.handleBackBtn = this.handleBackBtn.bind(this);
  }

  handleNextBtn() {
    this.props.nextItem();
  }

  handleBackBtn() {
    this.props.changePage(0);
  }

  render() {
    let nextItemName = (<span></span>);
    if (this.props.chosenItems !== undefined && this.props.currentItem >= 0) {
      nextItemName = (<span>{this.props.chosenItems[this.props.currentItem].info}</span>);
    }

    return (
      <div className={styles.pathList}>
        <button onClick={this.handleBackBtn}>Back to List</button>
        <button onClick={this.handleNextBtn}>Next</button>
        <span className={styles.nextItemName}>{nextItemName}</span>
      </div>
    );
  }
}

export default PathList;