import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import CONST from '../../CONST'
import { applyFilters, resetFilters } from '../../actions'
import InputBlock from './InputBlock'

class Filters extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.filters.id,
      assetName: this.props.filters.assetName,
      price: this.props.filters.price,
      lastUpdate: this.props.filters.lastUpdate,
      type: this.props.filters.type
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.filters !== nextProps.filters) {
      this.setState(nextProps.filters);
    }
  }

  onChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.props.applyFilters(this.state);
  }

  renderInputBlocks = (filters) => {
    return filters.map((filter, key) => (
      <InputBlock
        {...filter}
        key={key}
        value={this.state[filter.name]}
        onChange={this.onChange}
      />
    ))
  }

  render() {
    return (
      <div className="filters">
        <h2>Filters</h2>
        <form
          onSubmit={this.handleSubmit}
          className="filters__form">
          {this.renderInputBlocks(CONST.FILTERS)}
          <div className="filters__buttons">
            <button
              type="button"
              onClick={this.props.resetFilters}
              className="btn btn-default">
              Clear Filters
            </button>
            <button
              type="submit"
              className="btn btn-primary">
              Apply Filters
            </button>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  filters: state.filters
});

const mapActionsToProps = dispatch => ({
  applyFilters: filters => dispatch((applyFilters(filters))),
  resetFilters: () => dispatch((resetFilters()))
});

export default connect(mapStateToProps, mapActionsToProps)(Filters);
