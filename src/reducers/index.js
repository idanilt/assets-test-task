import actionTypes from '../actions/actionTypes'
import CONST from '../CONST'
import { getFavFromLocalStorage } from '../helpers'

const defaultState = {
  assetsCache: [],
  assets: [],
  sorting: {
    by: CONST.ASSETS_PROPS.ID,
    order: CONST.SORTING_ORDER.ASC
  },
  filters: {
    id: '',
    assetName: '',
    price: '',
    lastUpdate: '',
    type: ''
  }
};

const rootReducer = (state = defaultState, action) => {
  switch(action.type) {
    case actionTypes.ADD_ASSET:
      const assetsFavIds = getFavFromLocalStorage();
      const newAsset = action.payload;
      if (assetsFavIds.includes(newAsset.id)) {
        newAsset.addedToFav = 1;
      } else {
        newAsset.addedToFav = 0;
      }

      let assetsCache = [...state.assetsCache, newAsset];
      let assets = [];
      if (assetsCache.length % CONST.ASSETS_AMOUNT === 0) {
        assets = [...assetsCache];
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
      let { sorting } = state;
      let sortingOrder = sorting.order;
      if (newSortingBy === sorting.by) {
        sortingOrder = sortingOrder === ascOrder ? descOrder : ascOrder;
      } else {
        sortingOrder = ascOrder;
      }
      const newSorting = {
        by: newSortingBy,
        order: sortingOrder
      };

      return Object.assign({}, state, {
        sorting: newSorting
      });

    case actionTypes.APPLY_FILTERS:
      return Object.assign({}, state, {
        filters: action.payload
      });

    case actionTypes.RESET_FILTERS:
      return Object.assign({}, state, {
        filters: defaultState.filters
      });

    case actionTypes.TOGGLE_FAV:
      const assetId = action.payload;
      const favAssetsIds = getFavFromLocalStorage();
      let newFavAssetsIds = [];
      let addedToFav = false;
      if (favAssetsIds.includes(assetId)) {
        newFavAssetsIds = favAssetsIds.filter(id => +id !== +assetId)
      } else {
        newFavAssetsIds = favAssetsIds.concat(assetId);
        addedToFav = true;
      }
      localStorage.setItem('fav', JSON.stringify(newFavAssetsIds));

      const newAssets = [...state.assets];
      newAssets.find(asset => +asset.id === assetId).addedToFav = addedToFav;

      alert('Fav asset was toggled and reordered successfully');

      return Object.assign({}, state, {
        assets: newAssets
      });

    default:
      return state;
  }
};

export default rootReducer;
