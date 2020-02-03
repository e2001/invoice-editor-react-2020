### Invoice Editor - React Assignment



**Running the Application** 

 from the main folder run this command : 

```
yarn start
```



**Running the tests** 

from the main folder run this command : 

```
yarn test
```



---



**Design and assumptions** 

- action are design as a  **_Requested  _Response**  , this is done to make the flow of events and code clearer.  Initially an action is requested ( for example as a consequence of user interaction ) ,  then typically some logic can happen in the action creators , thunk , ( or in a saga in more complex cases ) , typically then a response action is fired with optional relevant  data. 
- this application uses redux, to hold the state 'one source of truth ' 
- the redux state is divided into 2 parts,  the state related to the invoice (invoiceState) i.e. like records , and the app state (appState) which holds app wide definitions ( like a prefix dictionary , amount of tax ) 
- InvoiceRow : is a state-full component , it is a PureComponent so should only render if the record it represents changes ,  InvoiceRow shows a invoice records data, or in edit mode it allows editing of that invoice record.  the changes can be saved to the store or undone. 
- InvoiceList : is a connected component , it maps over the record collection , and maps events from the InvoiceRow to redux actions , Note: the key used in the mapping is a guid generated when the record is created.
- InvoiceTotalSummery :  shows the tally of all the records , the calculation are done using a selector and the valus are not stored in the redux store , ( Note: if calculations are expensive there are ways to calculate only what has changed using the delta of what changed. ) 
- InvoiceEditorPage :  is used as a layout  for both the InvoiceList and the InvoiceTotalSummery (  both of these components can live separately and are not connected to each other neither do they need any porps supplied to them. )   , in a larger app , there may be more views that organize the components in different layouts. 





---



**Options and mock data**

the app loads some mock data , I carefully orchestrated the architecture of loading this data to be as close to what would be implemented in a real app that is connected to a live back end. 

- this data is served from a service : invoices.service.js

- the actual mock data is located in :  src\mock-data\mock-data.js

- app data includes : tax amount and a dictionary of prefixes ( $ and % ), that can be changed in src\mock-data\mock-data.js

- to get data , an action is fired 

  - **getRecordsRequested**  : this action is fired on mounting of the InvoiceEditorPage component , as it is the component that represents the record list and totals . InvoiceEditorPage represents the layout of the invoice page it holds together the grid of records and the summery , both of these components can live separately and are not connected to each other neither do they need any porps supplied to them. 
  - **getApplicationData** : this action is fired on mounting of the App component , as it is application wide data.

- the getRecordsRequested and getApplicationDataRequested both simulate a delay in getting the data, using timeout , I added this to allows to experiment with the issues of getting only some information before others.  

  



---



**Usibility assumptions** 

- a record need a non empty title, can have a quantity of 0 ( to allow to record items with 0 quantity )

  can have a price of  $0 to allow to record with no price.

- only one item can be edited at any time ( this can be of course changed as per requirements )

- a line can enter a edit mode either by clicking on an input or via the edit button 

- once a line is in edit mode, to exit edit mode, you can either save changes or undo 

- the invoice row is validated on input change, if a row is flagged as invalid it cannot be saved, an invalid icon is shown

- **add**: clicking on 'add' button adds an empty record to the list, Note that this record is saved to the store with the initial flag set to true , this distinguishes it from valid records.

- **validation** :   a record cannot be saved to the store in an invalid state, that is protected in 2 places, one the InvoiceRow Component, second at the action level ( here a classic requested action , where some logic is run to see if a response action should be fired. )

- **calculation row :**   will only show total for a valid cost and count  

- **calculation total summery** :  will only add up valid records, will indicate if any lines were skipped

- **'remove empty'** button :  removes all new records which were added but never edited,

  Note:  if an empty record is currently in edit mode it will not be removed. 



---



**Css and mobile responsiveness** 

- the app was built in a responsive way to allow good viewing at changing heights and widths , and very small size screens. 
- entry inputs have placeholders, that will disappear when input is in focus
- a row in edit mode is shown in background color : $editRowBackgroundColor
- scss variables are located at : src\css\variables.scss





------

