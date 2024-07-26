import express from 'express';
import clientsRoutes from './routes/client.routes.js'
import authRoutes from './routes/auth.routes.js'
import cors from 'cors';



const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.use(cors());

app.use(cors({
    origin: '*', // Permitir todos los orígenes
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true // Permitir envío de cookies o credenciales
  }));

app.use(clientsRoutes);
app.use(authRoutes);

export default app;