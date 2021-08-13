const {
	res,
	myQueries
} = require('./index.js')

const resolvers = {
	Query: {
		Users: async (_, { UserId } ) => {
			console.log( UserId);
			if(UserId){
				return [await res( myQueries.User, UserId )]
			}else{
				return await res(myQueries.allUsers)
			}
		}
	},
	Users: {
		UserId: (user) => user.user_id,
		UserName: (user) => user.user_name,
		isDeleted: (user) => user.is_deleted,
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
	},
	Mutation: {
		addUser: (_ ,user)=> console.log(user)
	}
};

module.exports = {
	resolvers
};