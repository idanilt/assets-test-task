import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Asset from './Asset'
import { sortBy, toggleFav } from '../../actions'
import CONST from '../../CONST'
import { filterAssets, sortAssets } from '../../helpers'

class Assets extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      assets: this.props.assets
    }
  }

  componentWillReceiveProps(nextProps) {
    // Using state in order to filter assets only when assets data or filters or sorting are changed
    if (this.props.assets !== nextProps.assets || this.props.filters !== nextProps.filters || this.props.sorting !== nextProps.sorting) {
      const newSorting = nextProps.sorting;
      const filteredAssets = filterAssets(nextProps.assets, nextProps.filters);
      this.setState({
        assets: sortAssets(filteredAssets, newSorting.by, newSorting.order)
      });
    }
  }

  sortById = () => this.props.sortBy(CONST.ASSETS_PROPS.ID)

  sortByName = () => this.props.sortBy(CONST.ASSETS_PROPS.NAME)

  sortByPrice = () => this.props.sortBy(CONST.ASSETS_PROPS.PRICE)

  sortByLastUpdate = () => this.props.sortBy(CONST.ASSETS_PROPS.LAST_UPDATE)

  sortByType = () => this.props.sortBy(CONST.ASSETS_PROPS.TYPE)

  renderAssetsRows = (assets = []) => {
    return assets.map((asset, key) => (
      <Asset
        key={key}
        toggleFav={this.props.toggleFav}
        {...asset}
      />
    ))
  }

  render() {
    const { sorting } = this.props;
    const { assets } = this.state;
    const sortingIcon = <i className={`fa fa-sort-${sorting.order}`} aria-hidden="true"></i>

    return (
      <table className="table table-bordered">
        <tbody>
        <tr>
          {/*Separate handlers are created in order to improve performance and not to create a new function with each render using bind() or () =>*/}
          <th onClick={this.sortById}>
            Id {sorting.by === CONST.ASSETS_PROPS.ID && sortingIcon}
          </th>
          <th onClick={this.sortByName}>
            Name {sorting.by === CONST.ASSETS_PROPS.NAME && sortingIcon}
          </th>
          <th onClick={this.sortByPrice}>
            Price {sorting.by === CONST.ASSETS_PROPS.PRICE && sortingIcon}
          </th>
          <th onClick={this.sortByLastUpdate}>
            Last Update {sorting.by === CONST.ASSETS_PROPS.LAST_UPDATE && sortingIcon}
          </th>
          <th onClick={this.sortByType}>
            Type {sorting.by === CONST.ASSETS_PROPS.TYPE && sortingIcon}
          </th>
          <th>Fav</th>
        </tr>
        {this.renderAssetsRows(assets)}
        </tbody>
      </table>
    );
  }
}

Assets.propTypes = {
  assets: PropTypes.array,
  filters: PropTypes.object,
  sorting: PropTypes.object,
  sortBy: PropTypes.func,
  toggleFav: PropTypes.func
};

const mapStateToProps = state => ({
  assets: state.assets,
  filters: state.filters,
  sorting: state.sorting
});

const mapActionsToProps = dispatch => ({
  sortBy: prop => dispatch((sortBy(prop))),
  toggleFav: assetId => dispatch((toggleFav(assetId))),
});

export default connect(mapStateToProps, mapActionsToProps)(Assets);
