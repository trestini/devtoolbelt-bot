import Router from 'koa-router';
const router = new Router();

import {slashCommands} from './service';

router.post("/", slashCommands);

export { router };

