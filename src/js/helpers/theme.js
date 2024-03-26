
const defaultTheme = (property) => {

};

const lightTheme = (property) => {

};

const greenTheme = (property) => {

};

const orangeTheme = (property) => {

};

const blueTheme = (property) => {

};


export const getClassName = (theme, property, className) => {
    let finalClassName = className ? className : '';

    if (theme && property) {
        switch (theme) {
            case 'default': {
                finalClassName += defaultTheme(property);
                break;
            }
            case 'light': {
                finalClassName += lightTheme(property);
                break;
            }
            case 'green': {
                finalClassName += greenTheme(property);
                break;
            }
            case 'orange': {
                finalClassName += orangeTheme(property);
                break;
            }
            case 'blue': {
                finalClassName += blueTheme(property);
                break;
            }
        };
    
    }

    return finalClassName;
}