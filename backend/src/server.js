"use strict"
// Get all packages
const {
	ApolloServer,
	gql
} = require('apollo-server');

const {
	res,
	myQueries
} = require('./model/index.js')
//Start server

const typeDefs = gql `
	type Query {
		Users: [Users]
	}

	type Users {
		UserId: Int!
		UserName: String!
		Privilege: String!
		isDeleted: String!
		UserTasks: [Tasks]
	}

	type Tasks {
		TaskId: Int!
		TaskText: String!
		TaskDate: String!
		TaskStatus: String!
	}
`;

const resolvers = {
	Query: {
		Users: async () => await res(myQueries.allUsers),
	},
	Users: {
		UserId: (user) => user.user_id,
		UserName: (user) => user.user_name,
		isDeleted: (user) => user.is_deleted,
		UserTasks: (user) => user.task_text,
		Privilege: (user) => user.privilege,
		UserTasks: async (user) => {
			const result = await res(myQueries.allTasks);
			return result.filter((task) => task.user_id === user.user_id);
		}
	},
	Tasks: {
		TaskId: (task) => task.task_id,
		TaskText: (task) => task.task_text,
		TaskDate: (task) => task.task_date,
		TaskStatus: (task) => task.task_status
	}
}

const server = new ApolloServer({
	typeDefs,
	resolvers
});

// The `listen` method launches a web server.
server.listen().then(({
	url
}) => {
	console.log(`🚀  Server ready at ${url}`);
});
//result.filter((task) => task.user_id === user.user_id);

//(tasks) => tasks.filter((task) => task.user_id === UserId)


/*





*/