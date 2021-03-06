"use strict"
// Get all packages
const {
	ApolloServer
} = require('apollo-server');

const { typeDefs } = require('./model/schema.js')

const { resolvers } = require('./model/resolvers.js')

//Start server

const server = new ApolloServer({
	typeDefs,
	resolvers
});

// The `listen` method launches a web server.
server.listen().then( ({
	url
}) => {
	console.log( `🚀  Server ready at ${url}`);
});