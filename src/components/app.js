import React, { PureComponent } from 'react'

import Asset from './Asset'
import { mock } from '../mock.js'
import { addAsset, sortBy } from '../actions'
import { connect } from 'react-redux'
import CONST from '../CONST'

class App extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    mock.subscribe(assets => this.props.addAsset(assets));
  }

  sortById = () => this.props.sortBy(CONST.ASSETS_PROPS.ID)

  sortByName = () => this.props.sortBy(CONST.ASSETS_PROPS.NAME)

  sortByPrice = () => this.props.sortBy(CONST.ASSETS_PROPS.PRICE)

  sortByLastUpdate = () => this.props.sortBy(CONST.ASSETS_PROPS.LAST_UPDATE)

  sortByType = () => this.props.sortBy(CONST.ASSETS_PROPS.TYPE)

  renderAssetsRows(assets = []) {
    return assets.map((asset, key) => (
      <Asset key={key} {...asset}/>
    ))
  }

  render() {
    const { assets, sortingBy, sortingOrder } = this.props;
    const sortingIcon = <i className={`fa fa-sort-${sortingOrder}`} aria-hidden="true"></i>

    return (
      <table className="table table-bordered">
        <tbody>
          <tr>
            {/*Separate handlers are created in order to improve performance and not to create a new function with each render using bind() or () =>*/}
            <th onClick={this.sortById}>
              Id {sortingBy === CONST.ASSETS_PROPS.ID && sortingIcon}
            </th>
            <th onClick={this.sortByName}>
              Name {sortingBy === CONST.ASSETS_PROPS.NAME && sortingIcon}
            </th>
            <th onClick={this.sortByPrice}>
              Price {sortingBy === CONST.ASSETS_PROPS.PRICE && sortingIcon}
            </th>
            <th onClick={this.sortByLastUpdate}>
              Last Update {sortingBy === CONST.ASSETS_PROPS.LAST_UPDATE && sortingIcon}
            </th>
            <th onClick={this.sortByType}>
              Type {sortingBy === CONST.ASSETS_PROPS.TYPE && sortingIcon}
            </th>
          </tr>
          {this.renderAssetsRows(assets)}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = state => ({
  assets: state.assets,
  sortingBy: state.sortingBy,
  sortingOrder: state.sortingOrder
});

const mapActionsToProps = dispatch => ({
  addAsset: asset => dispatch((addAsset(asset))),
  sortBy: prop => dispatch((sortBy(prop)))
});

export default connect(mapStateToProps, mapActionsToProps)(App);
