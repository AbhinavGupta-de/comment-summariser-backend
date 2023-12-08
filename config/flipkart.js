const { ApifyClient } = require('apify-client');
const dotenv = require('dotenv');

dotenv.config();

const client = new ApifyClient({
	token: process.env.APIFY_TOKEN,
});

async function scrapeFlipkartReviews(url, maxReview) {
	const input = {
		start_urls: [
			{
				url: `${url}`,
			},
		],
		max_items_count: maxReview,
		max_items_per_url: 0,
		detailed_variants: false,
		proxySettings: {
			useApifyProxy: true,
			apifyProxyGroups: [],
			apifyProxyCountry: 'US',
		},
	};
	const run = await client.actor('COcmxYbB46nexspPD').call(input);

	const { items } = await client.dataset(run.defaultDatasetId).listItems();

	let commentsArray = [];

	items.forEach((item) => {
		let comment = item.text;
		comment = item.title + ' ' + comment;
		comment = comment.replace(/\n/g, '');
		commentsArray.push(comment);
	});

	return commentsArray;
}

module.exports = { scrapeFlipkartReviews };
