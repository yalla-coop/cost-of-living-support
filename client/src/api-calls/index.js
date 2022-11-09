import axios from 'axios';

import * as Users from './users';
import * as ContentAudiLogs from './content-audi-logs';
import * as Media from './media';
import * as Organisations from './organisations';
import * as Steps from './steps';

axios.defaults.baseURL = `${process.env.PUBLIC_URL}/api`;

export { Users, ContentAudiLogs, Media, Organisations, Steps };
