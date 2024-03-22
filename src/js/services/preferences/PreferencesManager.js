import { Preferences } from '@capacitor/preferences';

class PreferencesManager {
    constructor() {
        this.preferences = {
            theme: "default",
            language: "en",
            autoBackupEnabled: false,
            currency: null,
            localDateTimeFormat: null,
        }
    }

    setCurrency = async (locale, currency) => {
        //currency are in ISO 4217 format
        this.preferences.currency = new Intl.NumberFormat(locale, { style: 'currency', currency: currency })
        const value = JSON.stringify({'locale': locale, 'currency': currency})
        await Preferences.set({ key: 'currencyFormat', value: value});
    };


    initialize = async () => {
        this.preferences.localDateTimeFormat = new Intl.DateTimeFormat(); //no need to save this one to preferences
        this.preferences.currency = new Intl.NumberFormat('EU', { style: 'currency', currency: 'EUR' }) //set first, then change if exist in preferences
        
        //setup currencyformat
        let currencyFormat = (await Preferences.get({key: 'currencyFormat'})).value;
        currencyFormat = JSON.parse(currencyFormat);
        if (currencyFormat != null) {
            this.preferences.currency = new Intl.NumberFormat(currencyFormat.locale, { style: 'currency', currency: currencyFormat.currency});
        };
        

    };


    getPreference = (key) => {
        const preference = this.preferences[key];
        console.log(`Preference ${key}`);
        return preference;
    };
}

export default PreferencesManager;