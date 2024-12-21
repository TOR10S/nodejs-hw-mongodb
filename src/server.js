import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import path from 'node:path';
import router from "./routers/index.js";
import { env } from './utils/env.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import cookieParser from 'cookie-parser';
import { UPLOAD_DIR } from './constants/index.js';
import swaggerUi from 'swagger-ui-express';
import * as fs from 'node:fs';
const swaggerDocument = JSON.parse(
  fs.readFileSync(path.resolve('docs/swagger.json'), 'utf-8'),
);

const PORT = Number(env("PORT","3000"));
export default function setupServer() {
const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );
app.use('/uploads', express.static(UPLOAD_DIR));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(router);
app.use('*', notFoundHandler);
app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

//** */
