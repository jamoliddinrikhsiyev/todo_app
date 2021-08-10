"use strict";
//Get all packages
const {
	pool
} = require('../config.js')

//Get database connection

const res = async (query) => {
	const client = await pool.connect()
	const result = await client.query(query)
	client.release()
	return result.rows
};

const myQueries = {
	allUsers: `
		SELECT
			users.user_id,
			users.user_name,
			CASE
				WHEN users.Privilege = 1 THEN 'Admin'
				WHEN users.Privilege = 0 THEN 'User'
			END AS privilege,
			CASE 
				WHEN users.is_deleted = 0 THEN 'false'
				ELSE 'true'
			END AS is_deleted,
			tasks.task_text
		FROM users
		INNER JOIN tasks USING(user_id)`,
	allTasks:`
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