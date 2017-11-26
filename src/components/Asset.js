import React from 'react'

export default class Asset extends React.PureComponent {
  constructor(props) {
    super();
  }

  // shouldComponentUpdate(nextProps) {
  //   if (nextProps.lastUpdate !== this.props.lastUpdate || nextProps.price !== this.props.price) {
  //     return true;
  //   }
  //
  //   return false;
  // }

  render() {
    const { id, assetName, price, lastUpdate, type } = this.props;
    return (
      <tr>
        <td>{id}</td>
        <td>{assetName}</td>
        <td>{price}</td>
        <td>{lastUpdate}</td>
        <td>{type}</td>
      </tr>
    )
  }
}
