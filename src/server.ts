process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';

import 'dotenv/config';
import App from '@/app';
import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import UsersRoute from '@routes/users.route';
import FilesRoute from '@routes/files.route';
import validateEnv from '@utils/validateEnv';
import RemindersRoute from './routes/reminders.route';
import PrioritiesRoute from './routes/priorities.route';

validateEnv();

const app = new App([new IndexRoute(), new UsersRoute(), new AuthRoute(), new FilesRoute(), new RemindersRoute(), new PrioritiesRoute()]);

app.listen();
