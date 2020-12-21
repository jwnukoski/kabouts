import React from 'react';
import ReactDOM from 'react-dom';


// component did mount
class AvailableItemsList extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    const item_id = Number(document.getElementById('items').value);
    this.props.addChosenItem(item_id);
  }

  render() {
    return (
      <div>
        <h2>Available Items:</h2>
        <select id="items">
          {
            this.props.items.map((item, index) => {
              return <option value={item.id} key={index}>{item.info}</option>;
            })
          }
        </select>
        <button onClick={this.handleSubmit}>Add</button>
      </div>

    );
  }
}

export default AvailableItemsList;