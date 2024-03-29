import { query } from '../../../database';

const findSectionsByOrgSlugForPublic = async (uniqueSlug, lng) => {
  const sql = `
    SELECT
      s.id,
      COALESCE (s_i18n.title, s.title) AS title,
      s.theme_key,
      (
        SELECT
          COUNT(*)
        FROM
          sections AS s2
        WHERE s2.parent_section_id = s.id
      ) > 0 AS has_sub_sections,
      s_i18n.language_code
    FROM organisations AS o
    INNER JOIN organisations_sections_orders AS oso
      ON o.id = oso.organisation_id
    INNER JOIN sections AS s
      ON oso.section_id = s.id
    LEFT JOIN sections_i18n AS s_i18n
      ON s.id = s_i18n.section_id AND s_i18n.language_code = $2
    WHERE o.unique_slug = $1
      AND oso.hidden = false
      AND s.parent_section_id IS NULL
      AND oso.approval_status = 'APPROVED'
      AND NOT oso.hidden
    ORDER BY oso.position ASC
  `;

  const res = await query(sql, [uniqueSlug, lng]);
  return res.rows;
};

const findSectionsByOrgSlug = async (uniqueSlug) => {
  const sql = `
    SELECT
      s.id,
      s.title,
      s.theme_key,
      s.default_position,
      o.id AS organisation_id,
      oso.position AS position,
      oso.hidden AS hidden,
      oso.approval_status AS approval_status,
      (
        SELECT
          COUNT(*)
        FROM
          sections AS s2
        WHERE s2.parent_section_id = s.id
      ) > 0 AS has_sub_sections
    FROM organisations AS o
    INNER JOIN organisations_sections_orders AS oso
      ON o.id = oso.organisation_id
    INNER JOIN sections AS s
      ON oso.section_id = s.id
    WHERE o.unique_slug = $1
      AND s.parent_section_id IS NULL
    ORDER BY oso.position ASC
  `;

  const res = await query(sql, [uniqueSlug]);

  return res.rows;
};

const getSubSectionsBySectionIdForPublic = async (id, lng) => {
  const sql = `
    SELECT 
      s.id,
      COALESCE (s_i18n.title, s.title) AS title,
      s_i18n.language_code,
      (
        SELECT
          ARRAY_AGG (
            jsonb_build_object(
              'id',  s2.id,
              'title', COALESCE (s2_i18n.title, s2.title),
              'position', s2.default_position,
              'language_code', s2_i18n.language_code 
            ) ORDER BY s2.default_position
          ) AS children_sections
        FROM sections AS s2
        LEFT JOIN sections_i18n AS s2_i18n
          ON s2.id = s2_i18n.section_id AND s2_i18n.language_code = $2
        WHERE s2.parent_section_id = s.id
      ) FROM sections AS s 
      LEFT JOIN sections_i18n AS s_i18n
        ON s.id = s_i18n.section_id AND s_i18n.language_code = $2
      WHERE s.id = $1
  `;

  const res = await query(sql, [id, lng]);
  return res.rows[0];
};

const findSectionById = async (id) => {
  const sql = `
    SELECT
      s.id,
      s.title,
      default_position,
      theme_key,
      (
        SELECT
        s2.title
        FROM sections AS s2
        WHERE s2.id = s.parent_section_id
      ) AS parent_section_title
    FROM sections AS s
    WHERE s.id = $1
  `;

  const res = await query(sql, [id]);
  return res.rows[0];
};

const findSectionWithTranslationById = async (id, lng) => {
  const sql = `
    SELECT
      s.id,
      COALESCE (s_i18n.title, s.title) AS title,
      s.theme_key,
      s.parent_section_id,
      s_i18n.language_code
    FROM sections AS s
    LEFT OUTER JOIN sections_i18n AS s_i18n
      ON s.id = s_i18n.section_id AND s_i18n.language_code = $2
    WHERE s.id = $1
  `;

  const res = await query(sql, [id, lng]);
  return res.rows[0];
};

const findSectionWithOrgDetails = async (id) => {
  const sql = `
    SELECT
      s.id,
      s.title,
      oso.organisation_id,
      (
        SELECT
          ARRAY_AGG(id)
        FROM topics AS t
        WHERE t.section_id = s.id
      ) AS topics_ids
    FROM sections AS s
    INNER JOIN organisations_sections_orders AS oso
      ON s.id = oso.section_id
    WHERE s.id = $1
  `;

  const res = await query(sql, [id]);
  return res.rows[0];
};

const findTopicsBySectionId = async (id) => {
  const sql = `
  SELECT
    topics.id,
    content
  FROM topics
  WHERE topics.section_id = $1
  ORDER BY position ASC`;

  const res = await query(sql, [id]);
  return res.rows;
};
const findTopicsWithTranslationBySectionId = async (id, lng) => {
  const sql = `
  SELECT
    topics.id,
    COALESCE(topics_i18n.content, topics.content) AS content,
    topics.content AS english_content,
    topics_i18n.language_code
  FROM topics
  LEFT OUTER JOIN topics_i18n
    ON topics.id = topics_i18n.topic_id 
   AND topics_i18n.language_code = $2
  WHERE topics.section_id = $1
  ORDER BY position ASC`;

  const res = await query(sql, [id, lng]);
  return res.rows;
};
const findAwaitingReviewSections = async () => {
  const sql = `
    SELECT
      s.id,
      s.title,
      o.organisation_name AS "organisation.name",
      o.id AS "organisation.id",
      o.unique_slug AS "organisation.unique_slug",
      u.email AS "user.email",
      u.id AS "user.id"

      FROM sections AS s
      INNER JOIN organisations_sections_orders AS oso
        ON s.id = oso.section_id
      INNER JOIN organisations AS o
        ON oso.organisation_id = o.id
      INNER JOIN users AS u
        ON u.organisation_id = o.id
      WHERE oso.approval_status = 'AWAITING_APPROVAL'
      ORDER BY oso.updated_at DESC
  `;

  const res = await query(sql);
  return res.rows;
};

export {
  findSectionsByOrgSlugForPublic,
  findSectionById,
  findTopicsBySectionId,
  findTopicsWithTranslationBySectionId,
  getSubSectionsBySectionIdForPublic,
  findSectionsByOrgSlug,
  findSectionWithOrgDetails,
  findSectionWithTranslationById,
  findAwaitingReviewSections,
};
