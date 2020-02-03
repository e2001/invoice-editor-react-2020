import mockData from "../mock-data/mock-data"
import utils from "../utils/utils"


function getRecords() {
  return [...mockData.mockRecordCollection]
}

function createNewRecord() {
  return utils.createRecord()
}

function getAppData() {
  return {
    ...mockData.mockAppData
  }
}

function canCalculateRecordTotal(count,price) {
  return utils.isPriceValid(price) && utils.isCountValid(count)
}

function isRecordValid(record) {

  if (utils.isStringEmpty(record.title)) {
    return false
  }
  if (!utils.isPriceValid(record.price)) {
    return false
  }
  if (!utils.isCountValid(record.count)) {
    return false
  }
  return true
}

export const getRecordTotalCostOrDefault = (count, price, defaultValue) => {

  if(canCalculateRecordTotal(count,price)){
    return parseFloat((count * price).toFixed(2))
  } else {
    return defaultValue
  }
}

export default {
  getRecords,
  createNewRecord,
  isRecordValid,
  getAppData,
  getRecordTotalCostOrDefault
}
