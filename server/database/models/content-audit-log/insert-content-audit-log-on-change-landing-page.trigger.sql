-- Trigger to insert new row into content_audit_log whenever
-- a landing_page_content is updated/created

CREATE OR REPLACE FUNCTION insert_content_audit_log_on_change_landing_page_fn()
  RETURNS TRIGGER AS $$
  BEGIN
    INSERT INTO content_audit_log AS cal (
      user_id,
      landing_page_content_id,
      type,
      updated_content
    ) VALUES (
      COALESCE(NEW.updated_by, NEW.created_by),
      NEW.id,
      CASE
        WHEN TG_OP = 'INSERT' THEN 'ADD'
        WHEN TG_OP = 'DELETE' THEN 'DELETE'
        ELSE 'UPDATE'
      END::content_audit_log_types,
      row_to_json(NEW.*)
    );
  RETURN NEW;
  END;
  $$
  LANGUAGE plpgsql;

CREATE TRIGGER insert_content_audit_log_on_change_landing_page_tr AFTER INSERT OR UPDATE ON landing_page_content
  FOR EACH ROW
    EXECUTE PROCEDURE insert_content_audit_log_on_change_landing_page_fn();