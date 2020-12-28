import React from 'react';

class Hint extends React.Component {
  constructor(props) {
    super(props);
    this.getBlock = this.getBlock.bind(this);
  }

  getBlock() {
    if (this.props.data.visible) {
      return <div>
        {this.props.data.msg}
      </div>
    } else {
      return <span></span>;
    }
  }

  render() {
    let hintStyle = {
      display: 'none',
      position: 'relative',
      width: '0px',
      height: '0px'
    };

    if (this.props.data.visible) {
      hintStyle = {
        backgroundColor: 'rgba(175, 175, 175, 0.9)',
        zIndex: '1000',
        position: 'absolute',
        width: '192px',
        height: '64px',
        overflow: 'hidden',
        padding: '8px',
        borderRadius: '8px',
        textAlign: 'center',
        display: 'block',
        border: '1px solid black',
        fontWeight: 'bold',
        left: `${(this.props.data.x * 64)}px`,
        top: `${(this.props.data.y * 64)}px`
      };
    }

    return (
      <div style={hintStyle}>
        {
          this.getBlock()
        }
      </div>
    );
  }
}

export default Hint;