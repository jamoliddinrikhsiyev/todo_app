"use strict";
//Get all packages
const {
	pool
} = require('../config.js')

//Get database connection

const res = async (query, arg) => {
	const client = await pool.connect();
	let result;
	if(arg) result = await client.query(query, arg );
	else result = await client.query(query);
	client.release();
	return result.rows;
};

const myQueries = {
	allUsers: `
		SELECT
			user_id,
			user_name,
			CASE
				WHEN privilege = 1 THEN 'Admin'
				WHEN privilege = 0 THEN 'User'
			END AS privilege,
			CASE 
				WHEN is_deleted = 0 THEN 'false'
				ELSE 'true'
			END AS is_deleted
		FROM users`,
	user: `
		SELECT
			user_id,
			user_name,
			password,
			CASE
				WHEN privilege = 1 THEN 'Admin'
				WHEN privilege = 0 THEN 'User'
			END AS privilege,
			CASE 
				WHEN is_deleted = 0 THEN 'false'
				ELSE 'true'
			END AS is_deleted
		FROM users
		WHERE user_id = $1
	`,
	allTasks: `
		SELECT
			task_id,
			user_id,
			tasks.task_text,
			task_add_date,
			task_deadline,
			CASE
				WHEN task_status = 0 THEN 'deleted'
				ELSE 'saved'
			END AS task_status
		FROM tasks`,
	tasks: `
		SELECT
			tasks.task_id,
			tasks.user_id,
			tasks.task_text,
			tasks.task_add_date,
			tasks.task_deadline,
			CASE
				WHEN tasks.task_status = 1 THEN 'saved'
			END AS task_status
		FROM tasks
		INNER JOIN users USING(user_id)
		WHERE user_id = $1 AND tasks.task_status != 0
	`,
	newUser: `
		INSERT INTO users (
			user_name,
			password
		)VALUES 
		( $1 , $2 )
		RETURNING user_id, user_name, password`,
	newTask: `
		INSERT INTO tasks (
			user_id,
			task_text,
			task_add_date,
			task_deadline,
			task_status
		)VALUES
		( $1, $2, $3, $4, 1)
		RETURNING tasks.task_id, tasks.user_id, tasks.task_text, tasks.task_add_date, tasks.task_deadline, tasks.task_status
	`,
	deleteTask: `
		UPDATE tasks
		SET task_status = 0
		WHERE user_id = $1 AND task_id = $2
		RETURNING task_status 
	`,
	setTaskText: `
		UPDATE tasks
		SET task_text = $1
		WHERE user_id = $2 AND task_id = $3
		RETURNING *
	`	
};

module.exports = {
	res,
	myQueries
};