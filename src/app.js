import express from 'express';
import libRoutes from './routes/libRoutes.js';

const app = express();
app.use(express.json());
app.use('/api/library', libRoutes);

app.use((req, res) => {
    res.status(404).json({ status: 404, message: "Error 404 NOT FOUND" });
});

export default app;
