const { ApifyClient } = require('apify-client');
const dotenv = require('dotenv');

dotenv.config();

const client = new ApifyClient({
	token: process.env.APIFY_TOKEN,
});

async function scrapeGoogleMaps(url, maxReview) {
	const input = {
		startUrls: [
			{
				url: `${url}`,
			},
		],
		maxReviews: maxReview,
		reviewsSort: 'newest',
		language: 'en',
		personalData: false,
	};

	const run = await client.actor('Xb8osYTtOjlsgI6k9').call(input);
	const { items } = await client.dataset(run.defaultDatasetId).listItems();
	let commentsArray = [];

	items.forEach((item) => {
		let comment = item.text;

		if (comment != null || comment != undefined) {
			comment = comment.replace(/(\r\n|\n|\r)/gm, ' ');
			commentsArray.push(comment);
		}
	});

	return commentsArray;
}

// Export the function using module.exports
module.exports = { scrapeGoogleMaps };
