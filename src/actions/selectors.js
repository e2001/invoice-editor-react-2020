import invoicesService from "../service/invoices.service"




export const selectInvoiceTotalSummery = (state) => {

  const {tax} = state.appState;
  const {recordCollection} = state.invoiceState;

  let skipped = 0;

  const subtotal = parseFloat(recordCollection.reduce(function (accumulator, currentItem) {
    if(invoicesService.isRecordValid(currentItem)){
      return accumulator + invoicesService.getRecordTotalCostOrDefault(currentItem.count , currentItem.price,0)
    }
    else{
      skipped++
      return accumulator
    }

  }, 0).toFixed(2))



  const taxCharge = parseFloat((subtotal * tax/100).toFixed(2));

  return {
    skipped,
    subtotal,
    tax,
    taxCharge,
    total: parseFloat((subtotal + taxCharge).toFixed(2))
  }
}
