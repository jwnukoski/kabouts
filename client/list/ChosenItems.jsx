import React from 'react';
import ReactDOM from 'react-dom';

// component did mount
class ChosenItems extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h2>Chosen Items:</h2>
        <ul>
          {
            this.props.chosenItems.map((item, index) => {
              return <li key={index}>{item.info}</li>
            })
          }
        </ul>
      </div>

    );
  }
}

export default ChosenItems;