--CREAT BASE
DROP DATABASE todoapp IF EXISTS;
CREATE DATABASE todoapp;

--#CREAT TABLES

CREATE TABLE users (
	user_id serial PRIMARY KEY NOT NULL,
	user_name varchar(64) NOT NULL,
	password varchar(255) NOT NULL,
	privilege smallint NOT NULL DEFAULT 0,
	is_deleted smallint NOT NULL DEFAULT 0
);

CREATE TABLE tasks (
	task_id serial NOT NULL,
	user_id int NOT NULL,
	task_text varchar(1256) NOT NULL,
	task_add_date varchar(128) NOT NULL,
	task_deadline varchar(128) NOT NULL DEFAULT 'THE TASK DEADLINE IS UNDEFINED!',
	task_status smallint NOT NULL
);


DROP TABLE users;
DROP TABLE tasks;


--#Only tests

--#INSERT INFO
--#INSERT TO USERS
INSERT INTO users (
	user_name,
	password,
	privilege
)VALUES
('ROOT', 'ROOT', 1);

INSERT INTO users (
	user_name,
	password
)VALUES('test', 'test')
RETURNING user_id;

INSERT INTO users (
	user_name,
	password
)VALUES
('Jamoliddin', crypt('1111', gen_salt('bf') ) );

--#INSERT TO TASKS

INSERT INTO tasks (
	user_id,
	task_text,
	task_add_date,
	task_status
)VALUES
(1, 'Test task from root user', 'test', 1),
(2, 'gadfsg', 'test', 1),
(2, 'safdgfdffgagsdf', 'aaaa', 1);

--#SELECT test

SELECT 
	tasks.task_id AS a,
	tasks.user_id AS b,
	users.user_name AS c,
	tasks.task_text AS d,
	tasks.task_date AS e,
	tasks.task_status AS f
FROM tasks
INNER JOIN users USING(user_id)
WHERE user_id = 1;

--	#INSERT AND RETURNING

INSERT INTO users (
	user_name,
	password
)VALUES
( $1, crypt($2, gen_salt('bf') ) )
RETURNING user_id;

--	#Alter table

--	#Update

UPDATE tasks
SET task_status = 0
WHERE user_id = 2 AND task_id = 1;