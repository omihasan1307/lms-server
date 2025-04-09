import cors from 'cors';
import express, { Application } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';

const app: Application = express();

const allowedOrigins = ['http://localhost:3000'];

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

// ✅ Keep ONLY this one
app.use(express.json());

// Application routes
app.use('/api/v1', router);

// Global error handler
app.use(globalErrorHandler);

// Not Found handler
app.use(notFound);

export default app;






// /* eslint-disable no-undef */
// /* eslint-disable no-unused-vars */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import cors from 'cors';
// import express, { Application } from 'express';
// import globalErrorHandler from './app/middlewares/globalErrorhandler';
// import notFound from './app/middlewares/notFound';
// import router from './app/routes';

// const app: Application = express();

// const allowedOrigins = ['http://localhost:3000'];

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error('Not allowed by CORS'));
//       }
//     },
//     credentials: true, // allow cookies
//   }),
// );

// //parsers
// app.use(express.json());
// app.use(cors());

// // application routes
// app.use('/api/v1', router);

// // const test = async (req: Request, res: Response) => {
// //   const a = 10;
// //   res.send(a);
// // };

// // app.get('/', test);

// app.use(globalErrorHandler);

// //Not Found
// app.use(notFound);

// export default app;
