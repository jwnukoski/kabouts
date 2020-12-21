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
    return (
      <div className={styles.pathList}>
        <button onClick={this.handleNextBtn}>Next</button>
        <button onClick={this.handleBackBtn}>Back to List</button>
      </div>
    );
  }
}

export default PathList;