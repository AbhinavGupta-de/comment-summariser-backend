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
		// Get the input data from the request body
		// console.log(req.body);
		const { url } = req.body;
		// console.log(url);

		// Check for validation errors
		// const errors = validationResult(req);
		// if (!errors.isEmpty()) {
		// If there are errors, send back a 400 status code and a message
		// return res.status(400).json({ errors: errors.array() });
		// }

		try {
			// If there are no errors, scrapeReviews the text from the website
			const text = await scrapeReviews(url);

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
