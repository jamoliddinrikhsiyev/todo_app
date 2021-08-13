"use strict";
//Get all packages
const {
	pool
} = require('../config.js')

//Get database connection

const res = async (query, $1) => {
	const client = await pool.connect()
	const result = await client.query(query)
	client.release()
	return result.rows
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
	User: `
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
		FROM users
		WHERE user_id = $1
	`,
	allTasks: `
		SELECT
			tasks.task_id,
			tasks.user_id,
			tasks.task_text,
			tasks.task_date,
			CASE
				WHEN tasks.task_status = 0 THEN 'deleted'
				ELSE 'saved'
			END AS task_status
		FROM tasks
		INNER JOIN users USING(user_id)`
};

module.exports = {
	res,
	myQueries
};