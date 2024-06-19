import express from 'express';
import cors from 'cors'
import routes from './routes/index.js'
import cookieParser from 'cookie-parser';


const app = express();
const port = 5000;

// Middleware
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
  origin: 'http://localhost:3000', 
  methods: 'GET,PUT,POST,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
};
app.use(cors(corsOptions));

// Use routes
app.use('/api', routes)


app.listen(port, () => (
  console.log("Server has started")
));