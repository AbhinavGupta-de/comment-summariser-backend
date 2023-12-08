const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { scrapeReviews } = require('../utils/scrapper.js');
const { summarize } = require('../config/langchain');

router.use(express.json());

router.post('/summarize', async (req, res) => {
	const { url } = req.body;
	const { maxReview } = req.body;

	try {
		const text = await scrapeReviews(url, maxReview);

		if (!text || text.length === 0 || text === undefined || text === null) {
			return res.status(500).json({ error: 'Something went wrong' });
		}

		const summary = await summarize(text);

		res.json({ summary });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

module.exports = router;
