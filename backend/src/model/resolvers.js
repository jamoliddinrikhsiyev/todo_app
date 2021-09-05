/*
	#Resolvers >
		Query > 
			Users >
				UserId
				UserName
				isDeleted
				Privilege
				UserTasks >
					Tasks >
						TaskId
						TaskText
						TaskDate
						TaskStatus
			Tasks >
				TaskId
				TaskText
				TaskDate
				TaskStatus
		Mutation >
			newUser >
				token
			newTask >
				Task
				Status
			setTask
				Task
				Status
*/
"use strict";

const {
	res,
	myQueries
} = require('./index.js');

const jwt = require('jsonwebtoken');

const varPassword = 'please';

let date = new Date();

let fullDate = `${date.getHours()}:${date.getMinutes()}/${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;

const resolvers = {
	Query: {
		Users: async (_ , args )=>{
			if( args && args.UserId == 1 && args.Admin == varPassword){
				let response = await res(myQueries.allUsers);
				return await response
			}else{
				return null;
			}
		},
		Tasks: async (_ , args)=>{
			if( args.Admin && args.Admin === varPassword){
				let response = await res(myQueries.allTasks);
				return await response;
			}else{
				let obj = jwt.verify(args.UserToken, varPassword);
				let response = await res(myQueries.tasks, [obj.user_id]);
				return await response;
			}
		}
	},
	Users: {
		UserId: user => user.user_id,
		UserName: user => user.user_name,
		isDeleted: user => user.is_deleted,
		Privilege: user => user.privilege,
		UserTasks: async (user) => {
			const result = await res(myQueries.allTasks);
			return result.filter((task) => task.user_id === user.user_id);
		}
	},
	Tasks: {
		TaskId: task => task.task_id,
		TaskText: task => task.task_text,
		TaskDate: task => task.task_deadline,
		TaskStatus: task => task.task_status 
	},
	Mutation: {
		newUser: async (_, args) => {
			let response = await res(myQueries.allUsers);

			async function checkUser( users, password){
				if( users && !password){
					let b = false;
					for(let i of users){
						if( i.user_name == args.username) b = true;
					}
					return b;
				}
				
				else if ( users && password){
					let response = await res(myQueries.searchUser, [args.username, args.password]);
					if( response[0] ){
						return await response;
					}else if( !response[0]){
						return null;
					}
				}
			}

			if(args.status == "test"){
				let token = jwt.sign({user_id: 0}, varPassword);
				return token
			}
			
			else if(args.status == "login"){
				let res = await checkUser(args.username, args.password);
				if( await res ){
					let token = jwt.sign({user_id: await res}, varPassword);
					return await token;
				}else return null;
			}
			
			else if( args.status == "create"){
				if(await checkUser(await response) === false){
					let response = await res(myQueries.newUser, [args.username, args.password]);
					let token = jwt.sign({user_id: await response[0].user_id}, varPassword);
					return await token;
				}else return null;
			}
		},
		newTask: async (_, args) => {
			if(args.status == "test"){
				console.log(args);
			}else if(args.status == "create"){
				let obj = jwt.verify(args.token, varPassword);
				let response = await res(myQueries.newTask, [ obj.user_id, args.TaskText, fullDate, args.TaskDeadline]);
				return await response;
			}
		},
		setTask: async (_ , args) => {
			let obj = jwt.verify(args.token, "please");
			if( args.delete == 1 ){
				let response = await res(myQueries.deleteTask, [obj.user_id, args.taskId]);
				return await response;
			}else{
				let response = await res(myQueries.setTaskText, [args.text, obj.user_id, args.taskId]);
				return await response;
			}
		}
	},
	newUser: {
		token: user => user
	},
	newTask: {
		Task: task => task,
		Status: () => 200
	},

	setTask: {
		Task: task => task,
		Status: () => "Success"
	}
};

module.exports = {
	resolvers
};