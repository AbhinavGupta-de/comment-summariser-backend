const { ApifyClient } = require('apify-client');
const dotenv = require('dotenv');

dotenv.config();

const client = new ApifyClient({
	token: `${process.env.APIFY_TOKEN}`,
});

async function scrapeAmazonReviews(url, maxReview) {
	const input = {
		productUrls: [
			{
				url: `${url}`,
			},
		],
		maxReviews: maxReview,
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
	const run = await client.actor('R8WeJwLuzLZ6g4Bkk').call(input);

	const { items } = await client.dataset(run.defaultDatasetId).listItems();

	let commentsArray = [];

	items.forEach((item) => {
		commentsArray.push(item.reviewDescription);
	});

	return commentsArray;
}

module.exports = { scrapeAmazonReviews };
