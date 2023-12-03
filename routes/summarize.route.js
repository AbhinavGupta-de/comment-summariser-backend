// summarize.route.js
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { scrapeReviews } = require('../utils/scrapper.js');
const { summarize } = require('../config/langchain');

//json parser

router.use(express.json());

// Define a route handler for the /summarize path
router.post(
	'/summarize',
	// Validate the input data
	// body('url').isURL().withMessage('URL is required and must be valid'),
	async (req, res) => {
		const { url } = req.body;
		const { maxReview } = req.body;

		try {
			// If there are no errors, scrapeReviews the text from the website
			const text = await scrapeReviews(url, maxReview);

			if (!text || text.length === 0 || text === undefined || text === null) {
				return res.status(500).json({ error: 'Something went wrong' });
			}

			// console.log(text);

			// Summarize the text using LangChain
			const summary = await summarize(text);

			// Send back the summary
			res.json({ summary });
		} catch (err) {
			// If the scraping or summarization fails, send back a 500 status code and a message
			res.status(500).json({ error: err.message });
		}
	}
);

module.exports = router;
