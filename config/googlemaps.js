const { ApifyClient } = require('apify-client');
const dotenv = require('dotenv');

dotenv.config();

// Initialize the ApifyClient with API token
const client = new ApifyClient({
	token: process.env.APIFY_TOKEN,
});

// Define an async function that takes a url and a maxReview as parameters
async function scrapeGoogleMaps(url, maxReview) {
	// Prepare Actor input
	const input = {
		startUrls: [
			{
				url: `${url}`, // Use the url parameter as the url property
			},
		],
		maxReviews: maxReview, // Use the maxReview parameter as the value of the maxReviews property
		reviewsSort: 'newest',
		language: 'en',
		personalData: false,
	};

	// Use a try-catch-finally block to handle errors
	try {
		// Run the Actor and wait for it to finish
		const run = await client.actor('Xb8osYTtOjlsgI6k9').call(input);

		// console.log(run);

		// Fetch the results from the run's dataset
		const { items } = await client.dataset(run.defaultDatasetId).listItems();

		// Create an empty array to store the comments
		let commentsArray = [];

		// Loop through the items and push the comment property to the array
		items.forEach((item) => {
			// console.log(item);

			let comment = item.text;
			// comment = item.title + ' ' + comment;
			// comment = comment.replace('/n', '');
			// console.log(comment);

			if (comment != null || comment != undefined) {
				commentsArray.push(comment);
			}
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
module.exports = { scrapeGoogleMaps };
