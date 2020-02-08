import React from 'react';
import {StaticRouter} from 'react-router-dom';
import ReactDOMServer from 'react-dom/server'
import routes from '../../routes/routes';

import {getBundles} from 'react-loadable/webpack';
import Loadable from 'react-loadable';

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


  	let scripts = bundles.filter(bundle => bundle.file.endsWith('.js')).map(function(scripts){
  		return '/public/js/'+scripts.file;
  	});

	return {
		"scripts" : scripts,
		"content": content
		};
}

