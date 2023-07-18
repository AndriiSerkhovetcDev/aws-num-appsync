# Numeric Values

This project was generated with SST Framework.

## Local run
In the root of the project, run the following command <strong>npm run dev</strong>, after successful loading, go to <strong>packages => web</strong>
folder in the console and run <b>ng serve</b>

### ApiGateawy 

ApiGateway used to process requests to retrieve data from Timestream db. (History of values, Last value) 

### AppSync 

AppSync used to synchronize data between clients and push new entered data.

The UI is implemented using Angular. Amplify is used to interact with AppSync.
It is implemented to get the history of records, get the last value, as well as entering a new value from the UI and subscribe to this event for data synchronization.


