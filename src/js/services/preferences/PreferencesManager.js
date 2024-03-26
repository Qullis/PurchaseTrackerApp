import { Preferences } from '@capacitor/preferences';

class PreferencesManager {
    constructor() {
        this.preferences = {
            theme: "default",
            language: "en",
            autoBackupEnabled: false,
            currency: null,
            currencyCode: null,
            localDateTimeFormat: null,
        }
    }

    setCurrency = async (locale, currency) => {
        //currency are in ISO 4217 format
        this.preferences.currency = new Intl.NumberFormat(locale, { style: 'currency', currency: currency })
        this.preferences.currencyCode = currency;
        const value = JSON.stringify({'locale': locale, 'currency': currency})
        await Preferences.set({ key: 'currencyFormat', value: value});
    };

    setTheme = async (theme) => {
        this.preferences.theme = theme;
        await Preferences.set({ key: 'theme', value: theme});
        const bodyClassName = 'body-' + theme;
        document.getElementById('body').className = bodyClassName;
    }


    initialize = async () => {
        this.preferences.localDateTimeFormat = new Intl.DateTimeFormat(); //no need to save this one to preferences
        this.preferences.currency = new Intl.NumberFormat('EU', { style: 'currency', currency: 'EUR' }) //set first, then change if exist in preferences
        this.preferences.theme = 'default';
        this.preferences.currencyCode = 'EUR';
        
        //setup currencyformat
        let currencyFormat = (await Preferences.get({key: 'currencyFormat'})).value;
        currencyFormat = JSON.parse(currencyFormat);
        if (currencyFormat != null) {
            this.preferences.currency = new Intl.NumberFormat(currencyFormat.locale, { style: 'currency', currency: currencyFormat.currency});
            this.preferences.currencyCode = currencyFormat.currency;
        };

        const theme = (await Preferences.get({key: 'theme'})).value;
        if (theme != null) {
            this.preferences.theme = theme;
            const bodyClassName = 'body-' + theme;
            document.getElementById('body').className = bodyClassName;
        };
        

    };


    getPreference = (key) => {
        const preference = this.preferences[key];
        console.log(`Preference ${key}`);
        return preference;
    };
}

export default PreferencesManager;