import * as express from 'express';
import * as services from './services';
import * as cors from 'cors';
export const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api', services.router);

