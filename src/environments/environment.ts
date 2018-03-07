// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

import {HttpHeaders} from '@angular/common/http';

export const environment = {
    production: false,
    loadingSpinner: '../../../assets/giphy.gif',
    loadingSpinner2: '../../../assets/MoreDance.gif',
    firebase: {
        apiKey: 'AIzaSyCUHTMpkoL951NN6wTgBD5Gs-CflBwQzxg',
        authDomain: 'panterest-58d18.firebaseapp.com',
        databaseURL: 'https://panterest-58d18.firebaseio.com',
        projectId: 'panterest-58d18',
        storageBucket: 'panterest-58d18.appspot.com',
        messagingSenderId: '870271143850'
    },

    corsProxy: 'https://cors-anywhere.herokuapp.com/',

    api: {
        baseUrl: this.base_api.corsProxy + 'http://food2fork.com/api/',
        baseSearchUrl: this.baseUrl + 'search',
        baseRecipeRequestUrl: this.baseUrl + 'get',
        keyParam: 'key',
        apiKey: '4f5c0e8ca2c5a339763c1a9b0ce2374d',
        keyParamValuePair: this.keyParam + '=' + this.apiKey,
        queryParam: 'q',
        recipeIDParam: 'rId',
        pageParam: 'page',
        httpOptions: {
            headers: new HttpHeaders({
                'Authorization': this.apiKey,
                'Accept': ['text/html', 'application/json'],
                'apikey': this.apiKey,
            })
        },
    }
};
