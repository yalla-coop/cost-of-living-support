BEGIN;

WITH RankedDuplicates AS (
    SELECT
        id,
        ROW_NUMBER() OVER (
            PARTITION BY section_id, organisation_id
            ORDER BY created_at DESC
        ) AS rn
    FROM organisations_sections_orders
)
DELETE FROM organisations_sections_orders
WHERE id IN (
    SELECT id FROM RankedDuplicates WHERE rn > 1
);

COMMIT;