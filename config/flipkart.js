const { ApifyClient } = require('apify-client');
const dotenv = require('dotenv');

dotenv.config();

// Initialize the ApifyClient with API token
const client = new ApifyClient({
	token: process.env.APIFY_TOKEN,
});

// Define an async function that takes a url and a maxReview as parameters
async function scrapeFlipkartReviews(url, maxReview) {
	// Prepare Actor input
	const input = {
		start_urls: [
			{
				url: `${url}`, // Use the url parameter as the url property
			},
		],
		max_items_count: maxReview, // Use the maxReview parameter as the value of the maxReviews property
		max_items_per_url: 0,
		detailed_variants: false,
		proxySettings: {
			useApifyProxy: true,
			apifyProxyGroups: [],
			apifyProxyCountry: 'US',
		},
	};
	// Use a try-catch-finally block to handle errors
	try {
		// Run the Actor and wait for it to finish
		const run = await client.actor('COcmxYbB46nexspPD').call(input);

		// console.log(run);

		// Fetch the results from the run's dataset
		const { items } = await client.dataset(run.defaultDatasetId).listItems();

		// Create an empty array to store the comments
		let commentsArray = [];

		// Loop through the items and push the comment property to the array
		items.forEach((item) => {
			// console.log(item);

			let comment = item.text;
			comment = item.title + ' ' + comment;
			comment = comment.replace('/n', '');
			// console.log(comment);
			commentsArray.push(comment);
		});

		// Return the array of comments
		return commentsArray;
	} catch (err) {
		// If an error occurs, log it to the console and return null
		console.error(err);
		return null;
	}
}

// Export the function using module.exports
module.exports = { scrapeFlipkartReviews };
