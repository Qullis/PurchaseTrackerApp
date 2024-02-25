//capacitor and app logic goes here in App, react logic goes in main
import { App as CapacitorApp } from '@capacitor/app';


//set hardware back-button to navigatte back
CapacitorApp.addListener('backButton', ({canGoBack}) => {
  if(!canGoBack){
    CapacitorApp.exitApp();
  } else {
    window.history.back();
  }
});

console.log('here')