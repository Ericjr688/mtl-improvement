import express from 'express';
import cors from 'cors'
import routes from './routes/index.js'
import pool from './db.js'


const app = express();
const port = 5000;

// Middleware
app.use(express.json());


const corsOptions = {
  origin: 'http://localhost:3000', // Allow requests only from this origin
  methods: 'GET,PUT,POST,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
};
app.use(cors(corsOptions));

// Use routes
app.use('/api', routes)


app.listen(port, () => (
  console.log("Server has started")
));