const { gql } = require('apollo-server');

const typeDefs = gql `
	type Query {
		Users( UserId: Int, Admin: String ): [Users]
		Tasks( UserToken: String, Admin: String ): [Tasks]
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
		newUser(username: String!, password: String!, status: String): newUser
		newTask(token: String!, TaskText: String!, TaskDeadline: String!, status: String!): newTask
		setTask(token: String!, taskId: Int!, text: String, delete: Int): setTask
	}

	type newUser{
		token: String!
	}

	type newTask{
		Task: [Tasks]
		Status: Int!
	}

	type setTask{
		Task: [Tasks]
		Status: String
	}
`;

module.exports = {
	typeDefs
};