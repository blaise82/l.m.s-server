import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import userRoute from './routes/user.routes';
import sectionRoute from './routes/section.routes';
import bookRoutes from './routes/book.routes';
import issueRoute from './routes/issue.routes';


dotenv.config();
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', (req, res) => res.send('Server Is On'));
app.use('/api/v1/auth', userRoute);
app.use('/api/v1/sections', sectionRoute);
app.use('/api/v1/books', bookRoutes);
app.use('/api/v1/issues', issueRoute);
app.use('/api/v1/books', bookRoutes);

app.use((req, res) => {
  res.status(404).send({
    status: 404,
    error: 'Oh!, This Page does not exist',
  });
});

app.listen(process.env.PORT || 5000);

export default app;
