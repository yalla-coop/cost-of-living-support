BEGIN;

ALTER TABLE "sections"
  DROP COLUMN "theme_key";

COMMIT;