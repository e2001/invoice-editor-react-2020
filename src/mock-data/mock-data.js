import utils from "../utils/utils"


const mockData = {
  loadRecordDelayMs : 1000,
  loadAppDataDelayMs: 2000,
  mockAppData: {
    tax: 5,
    prefixDic: {
      price: '$',
      percent: '%'
    }
  },
  mockRecordCollection:
    [
      utils.createRecord('book1', 1, 10),
      utils.createRecord('book2', 2, 20),
      utils.createRecord('book3', 3, 10),
      utils.createRecord('book4', 2, 10)
    ]
}

export default mockData
