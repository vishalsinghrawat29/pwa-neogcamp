import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';

const LOCAL_STORAGE = {};
const app = express();
const port = 8080; // default port to listen

// Serve all files in client
app.use(express.static(path.join(__dirname, '../client')));
app.use(bodyParser.json());

app.post('/subscription', async (req, res, next) => {
  try {
    const subscription = req.body;

    LOCAL_STORAGE.subscription = subscription;

    // Send 201 - resource created
    res.status(201).json({ status: 'okay'});
  } catch (e) {
    next(e);
  }
});

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});