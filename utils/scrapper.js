// Import the functions for scrapping data from different websites
const { scrapeAmazonReviews } = require('../config/amazon.js');
const { scrapeFlipkartReviews } = require('../config/flipkart.js');

// Add more imports as you create more functions for other websites

// Define a function that takes a URL as an input and returns the reviews as an output
async function scrapeReviews(url, maxReivew) {
	// Check the website name from the URL
	const website = checkWhichWebsite(url);

	// Create an empty array to store the reviews
	let reviews = [];

	// Use a switch statement to call the appropriate function for the website

	switch (website) {
		case 1:
			reviews = await scrapeAmazonReviews(url, maxReivew);
			break;

		case 2:
			reviews = await scrapeFlipkartReviews(url, maxReivew);
			break;

		case 3:
			return null;

		case 4:
			return null;

		case 5:
			return null;
	}

	// reviews = [
	// 	'Good grip, value for money',
	// 	'Same as shown',
	// 	'Highly priced, expected it would not last long',
	// 	'It skids. Gets wet and dirty fast',
	// 	'Very nice product and look is same as shown in picture.',
	// 	'Remains wet all day if used in the bathroom. Good for outside use more as room mat and not bathroom',
	// 	'Anti-skid, super absorbant and very very easy to clean and dry. Most economical and useful product. Very easy maintenance. No hassle of machine wash and threads coming out, as in the case of other mats!',
	// 	'It is gud product.  Color is little faded. Looks dirty after frequent use but get cleaned easily. Worth buying bit suggested to explore others as similar quality is available in lesser price.',
	// 	'Quality and colour is just perfect ! Just buy  it if u want a non skidding and super absorbent mat. The water is absorbed within 4 secs as promised. The packaging, pattern and colour all good.',
	// 	'It does not dry immediately  .water remains on mat .Disappointed for quality.pl advice what should be done for quick drying.',
	// ];

	return reviews;
}

const checkWhichWebsite = (url) => {
	if (url.includes('amazon')) {
		return 1;
	} else if (url.includes('flipkart')) {
		return 2;
	} else if (url.includes('youtube')) {
		return 3;
	} else if (url.includes('google')) {
		if (url.includes('maps')) {
			return 4;
		}
		return 5;
	} else {
		return 5;
	}
};

// Export the function
module.exports = { scrapeReviews };
