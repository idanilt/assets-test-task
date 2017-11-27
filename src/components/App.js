import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Filters from './Filters/FiltersIndex'
import Assets from './Assets/AssetsIndex'
import { mock } from '../mock.js'
import { addAsset } from '../actions'

class App extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    mock.subscribe(assets => this.props.addAsset(assets));
  }

  render() {
    return (
      <div>
        <h1>Assets App</h1>
        <Filters />
        <Assets />
      </div>
    );
  }
}

App.propTypes = {
  addAsset: PropTypes.func
};

const mapActionsToProps = dispatch => ({
  addAsset: asset => dispatch((addAsset(asset))),
});

export default connect(null, mapActionsToProps)(App);
