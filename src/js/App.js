//capacitor and app logic goes in App.js, react logic goes in main.js
import { App as CapacitorApp } from '@capacitor/app';

//set hardware back-button to navigatte back
CapacitorApp.addListener('backButton', ({canGoBack}) => {
  if(!canGoBack){
    CapacitorApp.exitApp();
  } else {
    window.history.back();
  }
});

/*let database = null;
async function initDatabase() {
  database = window.sqlitePlugin.openDatabase({name: 'sample.db', location: 'default'});

  database.transaction(function(transaction) {
    transaction.executeSql('CREATE TABLE SampleTable (name, score)');
  });
}

function echoTest() {
  window.sqlitePlugin.echoTest(function() {
    console.log('Echo test OK');
  }, function(error) {
    console.log('Echo test ERROR: ' + error.message);
  });
}

function selfTest() {
  window.sqlitePlugin.selfTest(function() {
    console.log('Self test OK');
  }, function(error) {
    console.log('Self test ERROR: ' + error.message);
  });
}

window.onload = () => {
  initDatabase();
  echoTest();
  selfTest();
};
*/