import React from 'react';
import './App.css';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { BrowserRouter as Router, Route } from "react-router-dom";

import ShowPage from './components/pages/ShowPage';
import HomePage from './components/pages/HomePage';


const client = new ApolloClient({
	uri: 'http://localhost:4000/graphql',
	cache: new InMemoryCache()
})

const App = () => {
	return (
		<ApolloProvider client={client}>
			<Router>
				<Route path="/" exact component={HomePage}></Route>
				<Route path="/people/:id" component={ShowPage}></Route>
			</Router>
		</ApolloProvider>
	)
}

export default App
