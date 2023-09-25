BEGIN;

ALTER TABLE "sections"
  ADD COLUMN "theme_key" INTEGER;

UPDATE "sections"
  SET "theme_key" = 1
  WHERE "default_position" IS NULL;

COMMIT;