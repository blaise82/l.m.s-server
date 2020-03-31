import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import userRoute from './routes/user.routes';
import sectionRoute from './routes/section.routes';
import bookRoutes from './routes/book.routes';
import issueRoute from './routes/issue.routes';
import searchRoute from './routes/search.routes';

dotenv.config();
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => res.status(200).send({
  status: 200,
  message: 'Welcome to L.M.S - Your Library Managment System',
}));
app.use('/api/v1/auth', userRoute);
app.use('/api/v1/sections', sectionRoute);
app.use('/api/v1/books', bookRoutes);
app.use('/api/v1/issues', issueRoute);
app.use('/api/v1/books', bookRoutes);
app.use('/api/v1/search', searchRoute);

app.use((req, res) => res.status(404).send({
  status: 404,
  error: 'Oh!, This Page does not exist',
}));

app.listen(process.env.PORT || 3000, () => {
  console.log('Server is running on PORT 3000...');
});

export default app;
