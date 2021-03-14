import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from './config/swagger';

import movieRoutes from './routes/movie.routes';
import commentRoutes from './routes/comment.routes';

// Create a new express app instance
const app: Application = express();

// Middlewares
app.use(cors());
// TODO
app.use(morgan('dev'));

app.set('port', process.env.PORT || 8080);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use('/movies', movieRoutes);
app.use('/comments', commentRoutes);

export default app;
