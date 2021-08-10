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
	task_date varchar(128) NOT NULL,
	task_status smallint NOT NULL
);

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
)VALUES
('Jamoliddin', crypt('1111', gen_salt('bf') ) );

--#INSERT TO TASKS

INSERT INTO tasks (
	user_id,
	task_text,
	task_date,
	task_status
)VALUES
(2, 'Test task from root user', 'test', 1),
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

SELECT 10*5;


ALTER TABLE users
ALTER COLUMN user SET