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

