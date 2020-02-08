import axios from 'axios';
import querystring from 'querystring';

var setAgent = 'default';
if(process.env.NODE_ENV != 'production'){
    var https    = require('https');
        setAgent = new https.Agent({
        rejectUnauthorized: false,//add when working with https sites
        requestCert: false,//add when working with https sites
        agent: false,//add when working with https sites
    });
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; // certificate has expired at TLSSocket
}

const Axios = axios.create();
Axios.defaults.timeout = (process.env.NODE_ENV == 'production') ? 5000: 50000;

export function getData(urlPath, type='mobile',postData = {}){
    let axiosConfig = {
		headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	};
	if(Object.keys(postData) == 0)
		var postData = {};
	postData['deviceType'] = type;
	return Axios.post(urlPath, querystring.stringify(postData), axiosConfig);
};


export function postRequest(urlPath, postData = {}, type='', config={}){

    var axiosConfig;
    const agent = setAgent;

    if(Object.keys(config).length > 0) {
        axiosConfig = config;
    } else {
        axiosConfig = {
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	        httpsAgent: agent
        };
    }

    if(Object.keys(postData) == 0)
            var postData = {};
    if(type!=''){
            postData['deviceType'] = type;
            return Axios.post(urlPath, querystring.stringify(postData), axiosConfig);
    }else{
            return Axios.post(urlPath, postData,  axiosConfig);
    }

};
export function postRequestAPIs(urlPath, postData = {}, config = {}){
    let axiosConfig;
    const agent = setAgent;
    if(Object.keys(config).length > 0) {
        axiosConfig = config;
    } else {
        axiosConfig = {
            headers: {'Content-Type': 'application/json; charset=utf-8'},
            httpsAgent: agent,
            withCredentials: true
        };
    }
    return Axios.post(urlPath, postData, axiosConfig);
}
export function getRequest(url,config={}){

    var axiosConfig;
    const agent = setAgent;

    if(Object.keys(config).length > 0) {
        axiosConfig = config;
    } else {
        axiosConfig = {
            headers: {'Content-Type': 'application/json; charset=utf-8'},
            httpsAgent: agent,
            withCredentials: true
        };
    }

    return Axios.get(url, axiosConfig).then(response => {
        return response;
    })
    .catch(error => {
        throw(error);
    });
};

function getPromiseRequest(url,config={}){
    let axiosConfig;
    const agent = setAgent;

    if(Object.keys(config).length > 0) {
        axiosConfig = config;
    } else {
        axiosConfig = {
            headers: {'Content-Type': 'application/json; charset=utf-8'},
            httpsAgent: agent,
            withCredentials: true
        };
    }

    return Axios.get(url, axiosConfig);
}

export function getMultipleAxiosRequest(){
    let axiosRequestArray = [];
    const config = arguments[arguments.length - 1];
    for(let i=0; i<arguments.length - 1; i++){
        axiosRequestArray.push(getPromiseRequest(arguments[i], config));
    }
   return axios.all(axiosRequestArray)
        .then(axios.spread(function (res1, res2) {
           return {'catPageData' : res1, 'pcwData' : res2};
        }));
}

