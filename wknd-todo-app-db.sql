-- Delete table
DROP TABLE "todo_list";

-- Create table
CREATE TABLE "todo_list" (
	"id" SERIAL PRIMARY KEY,
	"task" VARCHAR (250) NOT NULL,
	"complete" BOOLEAN NOT NULL DEFAULT FALSE,
	"date" DATE );


-- insert VALUES

INSERT INTO "todo_list" 
	("task", "complete", "date") 
VALUES ( 'laundry', 'FALSE','02-12-2021'),
		( 'clean dishes','FALSE', '02-13-2021'),
		( 'work on code', 'FALSE', '02-13-2021');
