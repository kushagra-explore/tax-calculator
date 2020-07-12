const cssFilesVersionArray = {};
const jsFilesVersionArray = {}
export function getCSSWithVersion(filename,path = 'pwa_mobile', mode='') {
    if(process.env.NODE_ENV === 'development' || mode === 'development') {
        return filename+'.css';
    }
    else {
        ensureFilledVersionArray(path,'css');
        for(let i in cssFilesVersionArray[path]) {
            if(cssFilesVersionArray[path][i]['originalPath'] === filename+".min.css")
            {
                return "build/"+cssFilesVersionArray[path][i]['versionedPath'];
            }
        }
    }
}
export function getJSWithVersion(filename,path = 'pwa_mobile', mode='') {
    if(process.env.NODE_ENV === 'development' || mode === 'development') {
        return filename+'.js';
    }
    else {//(process.env.NODE_ENV == 'production')
        ensureFilledVersionArray(path,'js');
        for(let i in jsFilesVersionArray[path]) {
            if(jsFilesVersionArray[path][i]['originalPath'] === filename+".js") {
                return jsFilesVersionArray[path][i]['versionedPath'];
            }
        }
    }
}
function ensureFilledVersionArray(path,type = 'js'){
    //const fs = require("fs");
    //const fpath = require("path");
    if(type === 'js'){
        //if(typeof jsFilesVersionArray[path] == 'undefined' || !jsFilesVersionArray[path]) {
        jsFilesVersionArray[path] = {};
        if(path === 'pwa_mobile'){
            jsFilesVersionArray[path] = JSON.parse(require("fs").readFileSync("mappings/pwa_mobile_vm_js.js","utf-8"));
        }
        //for jquery based registration, response and header search on pwa desktop
        if(path === 'shikshaDesktop'){
            jsFilesVersionArray[path] = JSON.parse(require("fs").readFileSync("/var/www/html/shiksha/public/mappings/desk_vm_js.js","utf-8"));
        }
        //}
    }
    else if(type === 'css'){
        //if(typeof cssFilesVersionArray[path] == 'undefined' || !cssFilesVersionArray[path]){
        cssFilesVersionArray[path] = {};
        if(path === 'pwa_mobile'){
            cssFilesVersionArray[path] = JSON.parse(require("fs").readFileSync("mappings/pwa_mobile_vm_css.js","utf-8"));
        }
        if(path === 'shikshaDesktop'){
            cssFilesVersionArray[path] = JSON.parse(require("fs").readFileSync("/var/www/html/shiksha/public/mappings/desk_vm_css.js","utf-8"));
        }
        //}
    }
}

export function getCssMinify(css){
    return css.replace(/\n/g, '').replace(/\s\s+/g, ' ');
}
