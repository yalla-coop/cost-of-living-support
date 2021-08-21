DROP TABLE IF EXISTS "steps" CASCADE;

CREATE TABLE "steps" (
  "id" SERIAL PRIMARY KEY,
  "stage" stage_types,
  "step_order" INT,
  "title" TEXT,
  "description" TEXT,
  "page_title" TEXT,
  "page_description" TEXT,
  "how_long_does_it_take" JSON,
    -- {
    --   time_range_text: '' //30 to 45 mins
    -- }
  "where_do_you_need_to_go" JSON,
    -- {
    --   link: '', //[PHONE, LINK]
    --   type: '',
    --   title: ''
    -- }
  "things_you_will_need" JSON[],
    -- [
    --   {
    --     title: '',
    --     description: '',
    --     this_can_include: [''],
    --     tips: ['']
    --   }
    -- ]
  "what_you_will_need_to_know" JSON[],
    -- [
    --   {
    --     title: '',
    --     description: '',
    --     this_can_include: [''],
    --     tips: ['']
    --   }
    -- ]
  "top_tip" TEXT,
  "other_tips" TEXT[],

  "created_by" INTEGER REFERENCES users(id),
  "created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updated_by" INTEGER REFERENCES users(id),
  "updated_at" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON "steps"
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();