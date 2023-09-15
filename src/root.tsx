import React from 'react';
import 'bootswatch/dist/solar/bootstrap.min.css';
import './App.css';
// Replace with import ChatPage from './views/chat-page';
import LandingPage from './views/landing-page';

function Root(): React.JSX.Element {
	return <LandingPage />;
}

export default Root;
