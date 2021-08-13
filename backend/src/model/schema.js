const { gql } = require('apollo-server');

const typeDefs = gql `
	type Query {
		Users(UserId: Int!): [Users]
	}

	type Users {
		UserId: Int!
		UserName: String!
		isDeleted: String!
		Privilege: String!
		UserTasks: [Tasks]	
	}

	type Tasks {
		TaskId: Int!
		TaskText: String!
		TaskDate: String!
		TaskStatus: String!
	}

	type Mutation {
		addUser(UserName: String!, UserPassword: String!): newUser
	}

	type newUser{
		UserName: String!,
		UserPassword: String!
	}
`;

module.exports = {
	typeDefs
};