DROP TABLE IF EXISTS "migrations" CASCADE;

CREATE TABLE "migrations" (
	"id" serial PRIMARY KEY,
	"name" varchar(255) NOT NULL,
	"run_on" timestamp NOT NULL DEFAULT NOW()
);


INSERT INTO "migrations" ("name") VALUES
  ('/20230820095929-add-icon-to-section-table'),
  ('/20240122124732-delete-duplicate-sections');

