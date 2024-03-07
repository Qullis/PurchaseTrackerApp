class PreferencesManager {
    constructor() {
        this.preferences = {
            theme: "default",
            language: "en",
            autoBackupEnabled: false,
            currency: "€"
        }
    }

    initialize = () => {
        //load preferences with capacitor preferences plugin
    };

    setPreference = async (key, value) =>{
        //set the preference
    };

    getPreference = () =>{
        const preferences = this.preferences;
        return preferences;
    };
}

export default PreferencesManager;