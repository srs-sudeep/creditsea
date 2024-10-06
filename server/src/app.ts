import express from 'express';
import type { Application } from 'express';
import cors from 'cors';
import connectDB from './db/mongodb';
import routes from './routes';

// Initialize express app
const app: Application = express();

// Middleware
app.use(express.json());

app.use(
    cors({
      origin: ['http://localhost:5173', 'http://127.0.0.1:5173', 'https://voosh-nine.vercel.app'],
      credentials: true,
      exposedHeaders: ['Set-Cookie'],
    }),
  );
  //Header configs
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    if (process.env.NODE_ENV === 'production') {
      res.header('Access-Control-Allow-Origin', 'https://voosh-nine.vercel.app');
    } else {
      res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
    }

    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    next();
  });



// Connect to the database
connectDB();

// Routes
app.use('/api', routes);

// Define the port with environment variable or default value
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
