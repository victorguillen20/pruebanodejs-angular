import express from 'express';
import clientsRoutes from './routes/client.routes.js'
import authRoutes from './routes/auth.routes.js'
import adminRoutes from './routes/admin.routes.js'
import turnRoutes from './routes/turn.routes.js'
import userRoutes from './routes/user.routes.js'
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

app.use(adminRoutes);
app.use(clientsRoutes);
app.use(authRoutes);
app.use(turnRoutes);
app.use(userRoutes);

export default app;