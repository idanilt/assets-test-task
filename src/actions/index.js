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