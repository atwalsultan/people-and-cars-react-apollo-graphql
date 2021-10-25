import React from 'react';
import './App.css';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { Divider } from 'antd';

import Title from './components/layout/Title';
import AddPerson from './components/forms/AddPerson';
import AddCar from './components/forms/AddCar';
import People from './components/lists/People';

const client = new ApolloClient({
	uri: 'http://localhost:4000/graphql',
	cache: new InMemoryCache()
})

const App = () => {
	return (
		<ApolloProvider client={client}>
			<div className="App">
				<AddPerson />

				<AddCar />

				<Divider>People & Cars</Divider>

				<People />
			</div>
		</ApolloProvider>
	)
}

export default App
