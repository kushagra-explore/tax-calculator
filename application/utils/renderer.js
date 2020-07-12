import React from 'react';
import {StaticRouter} from 'react-router-dom';
import ReactDOMServer from 'react-dom/server'
import routes from '../../routes/routes';

import {getBundles} from 'react-loadable/webpack';
import Loadable from 'react-loadable';
import {getCSSWithVersion, getCssMinify} from '../server/nodeHelper';

let nodeJsPath = 'js';
const stats = require('./../../public/' + nodeJsPath + '/react-loadable.json');
export default (req) => {
	let modules = [];
	const renderStartTime = Date.now();
	const content = ReactDOMServer.renderToString(
				<StaticRouter context={{}} location={req.url}>
					<Loadable.Capture report={function(moduleName) {return modules.push(moduleName)}}>
						{routes(req)}
					</Loadable.Capture>
				</StaticRouter>
	);

	const renderEndTime = Date.now();
	console.log("**** RenderTime::  ", (renderEndTime - renderStartTime));
	let bundles = getBundles(stats, modules);
	let styles  = [];
  	let scripts = bundles.filter(bundle => bundle.file.endsWith('.js')).map(function(scripts){
  		return '/public/js/'+scripts.file;
  	});
	styles = bundles.filter(bundle => bundle.file.endsWith('.css'));

	let css = '';
	//const serviceWokrerFile = 'service-worker.js';
	let cssLinks = [];
	let cssLinksArr = [];
	if(styles.length>0){
		cssLinks = styles.map(function(index){
			css += require('./../../public/'+nodeJsPath+'/'+index.file);
			return '/public/js/'+index.file;
		});

		//css = require("fs").readFileSync("public/js/"+styles[0].file,"utf-8")
		if(typeof css[0] != 'undefined' && typeof css[0][1] != 'undefined' && typeof css[0][1] == 'string') {
			css = getCssMinify(css[0][1]);
		}
	}

	return {
		"scripts" : scripts,
		"content": content,
		"getCSSWithVersion" : getCSSWithVersion,
		"styles": css,
		"cssLinks" : cssLinks,
		};
}

