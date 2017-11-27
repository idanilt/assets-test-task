export default {
  ASSETS_AMOUNT: 400,
  SORTING_ORDER: {
    ASC: 'asc',
    DESC: 'desc'
  },
  ASSETS_PROPS: {
    ID: 'id',
    NAME: 'assetName',
    PRICE: 'price',
    LAST_UPDATE: 'lastUpdate',
    TYPE: 'type'
  },
  FILTERS: [
    {
      name: 'id',
      type: 'number',
      placeholder: 'Id'
    },
    {
      name: 'assetName',
      type: 'text',
      placeholder: 'Name'
    },
    {
      name: 'price',
      type: 'number',
      placeholder: 'Price'
    },
    {
      name: 'lastUpdate',
      type: 'number',
      placeholder: 'Last Update'
    },
    {
      name: 'type',
      type: 'text',
      placeholder: 'Type'
    }
  ]
}