import React  from 'react';
import {Route, Switch} from 'react-router';
import gaTracker from './../application/client/gaTracker';
import {MainPage} from "./loadableRoutes";



export default function(pageReq=null) {
		return (
				  	<Switch>
						<Route exact={true} path = "/" component={gaTracker(pageReq, MainPage)}/>
					</Switch>
			)

}
