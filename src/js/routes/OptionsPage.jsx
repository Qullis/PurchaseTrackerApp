import { Link } from "react-router-dom";

import { preferencesManager } from "../services/services";

const OptionsPage = () => {

    const handleCurrencyCange = (event) => {
        const currency = event.target.value;
        switch (currency) {
            case 'SEK':
                preferencesManager.setCurrency('sv-SE', 'SEK')
                break;
            case 'USD':
                preferencesManager.setCurrency('en-US', 'USD');
                break;
            case 'EUR':
                preferencesManager.setCurrency('EU', 'EUR');
                break;
            case 'GBP':
                preferencesManager.setCurrency('en-GB', 'GBP');
                break;
        }
    };

    return (
        <>
            <div>
                <label htmlFor="appThemeSelect" className="text-white">Choose a theme:</label>
                <select className="form-select" aria-label="Choose a theme" id="appThemeSelect" name="appThemeSelect" defaultValue={"Default"}>
                    <option value="Default">Default</option>
                    <option value="Light">Light</option>
                    <option value="Green">Green</option>
                    <option value="Yellow">Yellow</option>
                    <option value="Blue">Blue</option>
                </select>
                <label htmlFor="appCurrencySelect" className="text-white mt-2">Currency for displaying prices:</label>
                <select className="form-select" aria-label="Choose a currency" id="appCurrencySelect" name="appCurrencySelect" defaultValue={"EUR"} onChange={handleCurrencyCange}>
                    <option value="EUR">Euro</option>
                    <option value="USD">United States dollar</option>
                    <option value="GBP">Pound sterling</option>
                    <option value="SEK">Swedish Krona</option>
                </select>
                <label htmlFor="appLanguageSelect" className="text-white mt-2">Choose a language:</label>
                <select disabled className="form-select" aria-label="Choose a currency" name="appLanguageSelect" id="appLanguageSelect">
                    <option value="en" selected>English</option>
                    <option value="sv">Swedish</option>
                </select>
                <label htmlFor="accountInfo" className="mt-4 text-center text-white w-100">&#9432; If you want to enable backup to the cloud you must first login or create an account.</label>
                <div className="text-center" id="accountInfo">
                <button className="btn btn-primary m-2 bi bi-box-arrow-in-right"> Login</button>
                <button className="btn btn-info m-2 bi bi-person-plus"> Register</button>
                </div>
                
            </div>
        </>
    )
};

export default OptionsPage;