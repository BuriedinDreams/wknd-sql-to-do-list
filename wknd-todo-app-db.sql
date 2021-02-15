-- Delete table
DROP TABLE "todo_list";

-- Create table
CREATE TABLE "todo_list" (
	"id" SERIAL PRIMARY KEY,
	"task" VARCHAR (250) NOT NULL,
	"complete" BOOLEAN NOT NULL DEFAULT FALSE );


-- insert VALUES

INSERT INTO "todo_list" ("task") 
VALUES ( 'laundry'),
		( 'clean dishes'),
		( 'work on code');
		
		
		
-- For POST example  -- querytext		
INSERT INTO "todo_list" ("task") 
  VALUES ('fishing');
		
		
		

