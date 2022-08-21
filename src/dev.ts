import InteractionsController from '@app/controllers/Interactions';
import express from 'express';
import { APP_PORT } from './config';
import { log } from './utils/Logger';

const app = express();

app.use(express.json());

app.post('/interactions', (req, res) => InteractionsController(req, res));

app.listen(APP_PORT, () => {
  log.info('Application listening @', APP_PORT);
});
