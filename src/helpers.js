import _ from 'lodash'

export function filterAssets(assets, filters) {
  if (!assets.length) {
    return [];
  }

  return assets.filter(asset => {
    const filtersKeys = Object.keys(filters);
    return filtersKeys.every(filterKey => {
      const assetValue = String(asset[filterKey]).toUpperCase();
      const filterValue = String(filters[filterKey]).toUpperCase();
      return assetValue.includes(filterValue) || !filterValue;
    });
  })
}

export function sortAssets(assets, sortingBy, sortingOrder) {
  // Fav should always be on the top
  return _.orderBy(assets, ['addedToFav', sortingBy], ['desc', sortingOrder])
}

export function getFavFromLocalStorage() {
  return JSON.parse(localStorage.getItem('fav') || '[]');
}