import Record from "../models/record"
import shortUUID from "short-uuid"


function createRecord(title = '', count = null, price = null) {
  return createRecordWithId(shortUUID.generate(),title,count,price)
}
function createRecordWithId(id,title = '', count = null, price = null) {
  const isInitial = !isPriceValid(price) || !isCountValid(count) || isStringEmpty(title)
  return new Record(id, title, count, price,isInitial)
}

function isStringEmpty(str) {
  return (!str || 0 === str.length)
}

function isNum(num) {
  return !/[^.[0-9]]*/.test(num)
}

function isPriceValid(value){
  if (!isNum(value) || value < 0 || (value!==0 && isStringEmpty(value))) {
    return false
  }
  return true
}

function cleanCount(value) {

  if(isCountValid(value)){
    return Math.floor(value)
  }
  else{
    return value
  }

}
function cleanPrice(value) {
  if(isPriceValid(value)){
    return parseFloat(value.toFixed(2))
  }
  else{
    return value
  }

}

function isCountValid(value){
  const result = (value - Math.floor(value)) !== 0;

  if (result || !isNum(value) || value < 0 || (value!==0 && isStringEmpty(value))) {
    return false
  }
  return true
}

export default {
  createRecord,
  createRecordWithId,
  isStringEmpty,
  isPriceValid,
  isCountValid,
}
