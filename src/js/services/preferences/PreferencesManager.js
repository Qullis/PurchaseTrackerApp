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

    setCurrency(country, currency) {
        this.preferences.currency = new Intl.NumberFormat(country, {style: 'currency', currency: currency})
    };


    initialize = async () => {
        //load preferences with capacitor preferences plugin
        this.preferences.localDateTimeFormat = new Intl.DateTimeFormat();
        this.preferences.currency = new Intl.NumberFormat('EU', {style: 'currency', currency: 'EUR'})
        console.log('set preferences')
    };

    setPreference = async (key, value) =>{
        if (key === 'currency') {
            this.setCurrency(value);
        }
        else {
            this.preferences[key] = value;
        };
    };

    getPreference = (key) =>{
        const preference = this.preferences[key];
        console.log(`Preference ${key}`);
        return preference;
    };
}

export default PreferencesManager;