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



#### **Design and assumptions** 

- redux Actions are design in a  **_Requested  _Response**  pattern , this is done to make the flow of events and code clearer.  

  - Initially an action is requested ( for example as a consequence of user interaction ) ,  then typically some logic can happen in the action creators , thunk , ( or in a saga in more complex cases ) , typically then a response action is fired with optional relevant  data. 

- this application uses redux store to hold the application's  'one source of truth ' 

- the redux store is divided into 2 parts,  the store related to the invoice (invoiceState) i.e. like records , and the app store (appState) which holds app wide definitions ( like a prefix dictionary , amount of tax ) 

- InvoiceRow : is a state-full component , it is a PureComponent so should only render if the record it represents changes , 

  InvoiceRow has 2 modes, in normal (read) mode it shows the record data , In edit mode it allows editing of that record.  the changes can be saved to the store or be undone. 

- InvoiceList : is a connected component , it maps over the record collection , and maps events from the InvoiceRow to redux actions , Note: the key used in the mapping is a guid generated when the record is created.

- InvoiceTotalSummery :  shows the tally of all the records , the calculation are done using a selector and the values of the totals are not stored in the redux store , ( Note: if calculations are expensive there are ways to calculate only what has changed using the delta of what changed. ) 

- InvoiceEditorPage :  is used as a layout  for both the InvoiceList and the InvoiceTotalSummery (  both of these components can live separately and are not connected to each other neither do they need any porps supplied to them. )   . In a larger app , there may be more views that organize these components in different ways. 





---



#### **Options and mock data**

The app loads some mock data , I carefully orchestrated the architecture of loading this data ...  in accordance with solid architecture principles : 

- this data is served from a service : invoices.service.js

- the actual mock data is located in :  src\mock-data\mock-data.js

- app data includes : tax amount and a dictionary of prefixes ( $ and % ), that can be changed in src\mock-data\mock-data.js

- to get data , an action is fired 

  - **getRecordsRequested**  : this action is fired on mounting of the InvoiceEditorPage component , as it is the component that represents the record list and totals . once the data is obtained the getRecordsResponse action is fired.
  - **getApplicationDataRequested**: this action is fired on mounting of the App component , as it is application wide data. once the data is obtained the getApplicationDataResponse action is fired.

- the getRecordsRequested and getApplicationDataRequested both simulate a delay in getting the data, using timeout ,both action return a promise , I added this to allows to experiment with the issues of getting only some information before others.  

  



---



#### **Usability ** 

- a record needs a non empty title, can have a quantity of 0 ( to allow adding records with 0 quantity )

  can have a price of  $0 ( to allow adding records with no price) 

- only one item can be edited at any given time ( this can be of course changed as per requirements )

- a row can enter into an edit mode either by clicking on an input or via the edit button 

- to exit a row's edit mode, you can either save or undo 

- a row is validated on input change, if a row is flagged as invalid it cannot be saved, an invalid icon is shown 

- I wanted to emphasize to the user the fact that a record was touched. hence also the use of color 

- **add**: clicking on 'add' button adds an empty record to the list, Note that this record is saved to the store with the initial flag set to true , this distinguishes it from other valid records.

- **validation** :   a record cannot be saved to the store in an invalid state, that is enforced in 2 places : one, validation in the InvoiceRow Component, second, at the action level ( here is a classic case of a requested action where some logic is run to see if a response action should be fired. )

- **calculation row :**   will only show a value in the total column , if the row has a valid cost and count  

- **calculation total summery** :  will only add up valid records, will indicate if any lines were skipped

- **'remove empty' ** button :  removes all new records which were added but never edited,

  Note:  if an empty record is currently in edit mode it will not be removed. 



---



#### **Css and mobile responsiveness** 

- the app was built in a responsive way to allow good viewing at changing heights and widths , and in very small screens. 
- entry inputs have placeholders, that will disappear when input is in focus
- To emphasize that a row is in edit mode , a background color : $editRowBackgroundColor is used 
- scss variables are located at : src\css\variables.scss





------

