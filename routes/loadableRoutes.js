import React from "react";
import Loadable from 'react-loadable';

export const  MainPage = Loadable({
		loader: () => import('./../application/Component/MainPage'/* webpackChunkName: 'mainPage' */),
		loading : () => null
	});
