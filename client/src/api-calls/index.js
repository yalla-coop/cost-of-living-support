import axios from 'axios';

import * as Users from './users';
import * as ContentAudiLogs from './content-audi-logs';
import * as Media from './media';
import * as Organisations from './organisations';
import * as Steps from './steps';
import * as Sections from './sections';
import * as Common from './common';

axios.defaults.baseURL = `${process.env.PUBLIC_URL}/api`;

export {
  Users,
  ContentAudiLogs,
  Media,
  Organisations,
  Steps,
  Sections,
  Common,
};
