const express = require('express');
const summarizeRoute = require('./routes/summarize.route');
const dotenv = require('dotenv');

dotenv.config();

app.use(cors());

const app = express();

app.get('/', (req, res) => {
	res.send('Hello World');
});

app.post('/summarize', summarizeRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log('Server is running on port 3000');
});
