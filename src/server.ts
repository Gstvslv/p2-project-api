import express from 'express';
import bodyParser from 'body-parser';
import contractRoutes from './routes/contract.routes';
import jobRoutes from './routes/job.routes';
import paymentRoutes from './routes/payment.routes';
import profileRoutes from './routes/profile.routes';
import depositRoutes from './routes/deposit.routes'

const app = express();
app.use(bodyParser.json());

app.use('/profiles', profileRoutes)
app.use('/deposits', depositRoutes)
app.use('/contracts', contractRoutes);
app.use('/jobs', jobRoutes);
app.use('/payments', paymentRoutes);

app.get('/', (req, res) => {
    res.send('API is running');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});