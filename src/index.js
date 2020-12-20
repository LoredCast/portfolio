import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { IntlProvider } from 'react-intl';



import en from './Content/Translations/en.json'
import de from './Content/Translations/de.json'



const messages = {
    "en" : en,
    "de" : de
}
console.log(messages["de"])

ReactDOM.render(
  <React.StrictMode>

      <IntlProvider locale="de" messages={messages["de"]}>
    <App />
        </IntlProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
