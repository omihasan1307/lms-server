import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';

const app: Application = express();

const allowedOrigins = ['http://localhost:3000', 'https://lms-client-woad.vercel.app'];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  }),
);

app.use(express.json());
app.use('/api/v1', router);

// Add health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'healthy' });
});

app.use(globalErrorHandler);
app.use(notFound);

// Export as a serverless function
export default app;