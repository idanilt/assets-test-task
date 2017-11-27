import React, { PureComponent } from 'react'

export default class Asset extends PureComponent {
  constructor(props) {
    super(props);
  }

  toggleFav = () => {
    this.props.toggleFav(this.props.id);
  }

  render() {
    const { id, assetName, price, lastUpdate, type, addedToFav } = this.props;
    return (
      <tr>
        <td>{id}</td>
        <td>{assetName}</td>
        <td>{price}</td>
        <td>{lastUpdate}</td>
        <td>{type}</td>
        <td onClick={this.toggleFav}>
          <i className={`fa fa-heart ${addedToFav ? 'active' : ''}`} aria-hidden="true"></i>
        </td>
      </tr>
    )
  }
}
