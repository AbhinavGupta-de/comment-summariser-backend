// scrapeAmazonReviews.js
const { ApifyClient } = require('apify-client');

// Initialize the ApifyClient with API token
const client = new ApifyClient({
	token: 'apify_api_GXJMMYdv4b2uAA3TMlVzXeNm8wWsIF13GjZ7',
});

// Define an async function that takes a url and a maxReview as parameters
async function scrapeAmazonReviews(url, maxReview) {
	// Prepare Actor input
	const input = {
		productUrls: [
			{
				url: `${url}`, // Use the url parameter as the url property
			},
		],
		maxReviews: 10, // Use the maxReview parameter as the value of the maxReviews property
		includeGdprSensitive: false,
		filterByRatings: ['allStars'],
		proxyConfiguration: {
			useApifyProxy: true,
			apifyProxyGroups: ['RESIDENTIAL'],
		},
		extendedOutputFunction: ($) => {
			return {};
		},
	};
	// Use a try-catch-finally block to handle errors
	try {
		// Run the Actor and wait for it to finish
		const run = await client.actor('R8WeJwLuzLZ6g4Bkk').call(input);

		// console.log(run);

		// Fetch the results from the run's dataset
		const { items } = await client.dataset(run.defaultDatasetId).listItems();

		// Create an empty array to store the comments
		let commentsArray = [];

		// Loop through the items and push the comment property to the array
		items.forEach((item) => {
			// console.log(item);
			commentsArray.push(item.reviewDescription);
		});

		// Return the array of comments
		return commentsArray;
	} catch (err) {
		// If an error occurs, log it to the console and return null
		console.error(err);
		return null;
	} finally {
		// Perform any cleanup or final actions here
		// For example, you can close the client connection
		// client.close();
	}
}

// Export the function using module.exports
module.exports = { scrapeAmazonReviews };
