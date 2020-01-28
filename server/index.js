import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import userRoute from './routes/user.routes';
import sectionRoute from './routes/section.routes';
import bookRoutes from './routes/book.routes';

dotenv.config();
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/v1/user', userRoute);
app.use('/api/v1/sections', sectionRoute);
app.use('/api/v1/books', bookRoutes);

app.use((req, res) => {
  res.status(404).send({
    status: 404,
    error: 'Oh!, This Page does not exist',
  });
});

if (!module.parent) {
  app.listen(process.env.PORT || 5000);
}
export default app;
