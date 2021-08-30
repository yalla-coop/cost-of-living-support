import * as models from './models';
import init from './init';

// For both production and development
const buildTables = async () => {
  await init.createTypes();
  await init.createAutoTimestamps();
  await init.buildMigrations();

  await models.media.createTable();
  await models.organisations.createTable();
  await models.users.createTable();
  await models.landingPageContent.createTable();
  await models.steps.createTable();
  await models.contentAuditLog.createTable();
  await models.contentAuditLog.createTriggers();
};

export default buildTables;
