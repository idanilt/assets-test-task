import actionTypes from '../actions/actionTypes'
import CONST from '../CONST'
import _ from 'lodash'

const defaultState = {
  assetsCache: [],
  assetsFinal: [],
  sortingBy: 'id',
  sortingOrder: CONST.SORTING_ORDER.ASC
};

const rootReducer = (state = defaultState, action) => {
  switch(action.type) {
    case actionTypes.ADD_ASSET:
      const newAsset = action.payload;
      let assetsCache = [...state.assetsCache, newAsset];
      let assets = [];
      if (assetsCache.length % CONST.ASSETS_AMOUNT === 0) {
        assets = _.orderBy([...assetsCache], [state.sortingBy], [state.sortingOrder]);
        assetsCache = [];
      }

      return Object.assign({}, state, {
        assets,
        assetsCache
      });

    case actionTypes.SORT_BY:
      const ascOrder = CONST.SORTING_ORDER.ASC;
      const descOrder = CONST.SORTING_ORDER.DESC;
      const newSortingBy = action.payload;
      let { sortingBy, sortingOrder } = state;
      if (newSortingBy === sortingBy) {
        sortingOrder = sortingOrder === ascOrder ? descOrder : ascOrder;
      } else {
        sortingOrder = ascOrder;
      }

      return Object.assign({}, state, {
        assets: _.orderBy(state.assets, [newSortingBy], [sortingOrder]),
        sortingOrder,
        sortingBy: newSortingBy
      });

    default:
      return state;
  }
};

export default rootReducer;
