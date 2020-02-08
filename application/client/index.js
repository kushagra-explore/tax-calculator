import React  from 'react';
import Loadable from 'react-loadable'
import { hydrate } from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import routes from '../../routes/routes';
//import Analytics from './../modules/reusable/utils/AnalyticsTracking';






//window.pwaGATrack = Analytics.event;


export default class Index extends React.Component
{
	constructor(props)
	{
		super(props);
	}


	render()
	{

		const pageReqData = {};


		return (
				<Router key={Math.random()}>
							{routes(pageReqData)}
				</Router>
			);
	}
}

	Loadable.preloadReady().then(() => {
	  hydrate(
			<React.Fragment>
					<Index />
		  </React.Fragment>,
		  document.getElementById('root')
		);
	});