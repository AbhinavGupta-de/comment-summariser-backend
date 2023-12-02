const express = require('express');
const summarizeRoute = require('./routes/summarize.route');

const app = express();

app.get('/', (req, res) => {
	res.send('Hello World');
});

app.post('/summarize', summarizeRoute);

app.listen(3000, () => {
	console.log('Server is running on port 3000');
});
