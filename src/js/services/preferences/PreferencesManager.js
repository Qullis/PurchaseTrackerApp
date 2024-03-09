class PreferencesManager {
    constructor() {
        this.preferences = {
            theme: "default",
            language: "en",
            autoBackupEnabled: false,
            currency: "€",
            localDateTimeFormat: null,
        }
    }



    initialize = () => {
        //load preferences with capacitor preferences plugin
        this.preferences.localDateTimeFormat = new Intl.DateTimeFormat();
    };

    setPreference = async (key, value) =>{
        //set the preference
    };

    getPreference = (key) =>{
        const preference = this.preferences[key];
        return preference;
    };
}

export default PreferencesManager;