const express = require('express');
const summarizeRoute = require('./routes/summarize.route');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors());

app.get('/', (req, res) => {
	res.send('Hello World');
});

app.post('/summarize', summarizeRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log('Server is running on port 3000');
});
