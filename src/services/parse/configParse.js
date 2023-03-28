import Parse from "parse";

const configParse = () => {
  Parse.initialize(process.env.REACT_APP_APP_ID, process.env.REACT_APP_JS_KEY);
  Parse.serverURL = 'https://parseapi.back4app.com/';
}

configParse();
