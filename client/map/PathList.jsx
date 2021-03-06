import PropTypes from 'prop-types'
import React from 'react'
import styles from './css/pathlist.module.css'

class PathList extends React.Component {
  constructor (props) {
    super(props)
    this.handleNextBtn = this.handleNextBtn.bind(this)
    this.handleBackBtn = this.handleBackBtn.bind(this)
  }

  handleNextBtn () {
    this.props.nextItem()
  }

  handleBackBtn () {
    this.props.changePage(0)
  }

  render () {
    let nextItemName = (<p>Click next to start</p>)
    if (this.props.chosenItems !== undefined && this.props.currentItem >= 0) {
      nextItemName = (<p>Showing path to: <span>{this.props.chosenItems[this.props.currentItem].info}</span></p>)
    }

    return (
      <div className={styles.pathList}>
        <button onClick={this.handleBackBtn}>Back to List</button>
        <button onClick={this.handleNextBtn}>Next</button>
        {nextItemName}
      </div>
    )
  }
}

PathList.propTypes = {
  chosenItems: PropTypes.array,
  currentItem: PropTypes.number,
  nextItem: PropTypes.func,
  changePage: PropTypes.func
}

export default PathList
