import { globalCatch } from '@middlewares';
import router from '@routes';
import cors from 'cors';
import express, { Request, Response } from 'express';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/v1', router);

app.use(globalCatch);

app.use((req: Request, res: Response) => {
  return res.status(404).json({
    success: false,
    message: 'API not found',
  });
});

export default app;
