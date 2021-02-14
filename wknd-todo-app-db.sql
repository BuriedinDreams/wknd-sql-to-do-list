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
VALUES ( 'laundry','02-12-2021'),
		( 'clean dishes', '02-13-2021'),
		( 'work on code', '02-13-2021');
		
		
		
		
INSERT INTO "todo_list" ("task", "complete", "date") 
  VALUES ('fishing','02-12-2021');
		
		
		

