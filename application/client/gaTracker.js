import React, {Component} from 'react';
//import Analytics from './../modules/reusable/utils/AnalyticsTracking';


export default function gaTracker(pageReq=null,Component) {
    return class extends Component {
        render() {
            return <Component {...this.props} pageReq={pageReq}/>;
        }
    };
}
