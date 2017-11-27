import actionTypes from './actionTypes'

export function addAsset(asset) {
  return {
    type: actionTypes.ADD_ASSET,
    payload: asset
  }
}

export function sortBy(propName) {
  return {
    type: actionTypes.SORT_BY,
    payload: propName
  }
}

export function applyFilters(filters) {
  return {
    type: actionTypes.APPLY_FILTERS,
    payload: filters
  }
}

export function resetFilters() {
  return {
    type: actionTypes.RESET_FILTERS
  }
}

export function toggleFav(assetId) {
  return {
    type: actionTypes.TOGGLE_FAV,
    payload: assetId
  }
}