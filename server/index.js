import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import userRoute from './routes/user';

dotenv.config();
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Server Is On'));
app.use('/api/v1/user', userRoute);

app.use((req, res) => {
  res.status(400).send({
    status: 400,
    error: 'Bad Request',
  });
});

if (!module.parent) {
  app.listen(process.env.PORT || 8080);
}
export default app;
