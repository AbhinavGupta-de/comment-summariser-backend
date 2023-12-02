// Import the functions for scrapping data from different websites
const { scrapeAmazonReviews } = require('../config/amazon.js');
// Add more imports as you create more functions for other websites

// Define a function that takes a URL as an input and returns the reviews as an output
async function scrapeReviews(url) {
	// Check the website name from the URL
	let bool = url.includes('amazon');

	// Declare a variable to store the reviews
	let reviews = [];
	// Use a switch statement to call the appropriate function based on the website name
	// switch (bool) {
	// 	case 'amazon':
	// Call the scrapeAmazonReviews function and assign the result to reviews
	// try {
	// 	reviews = await scrapeAmazonReviews(url);
	// } catch (err) {
	// 	console.log(err);
	// }

	reviews = [
		'Good grip, value for money',
		'Same as shown',
		'Highly priced, expected it would not last long',
		'It skids. Gets wet and dirty fast',
		'Very nice product and look is same as shown in picture.',
		'Remains wet all day if used in the bathroom. Good for outside use more as room mat and not bathroom',
		'Anti-skid, super absorbant and very very easy to clean and dry. Most economical and useful product. Very easy maintenance. No hassle of machine wash and threads coming out, as in the case of other mats!',
		'It is gud product.  Color is little faded. Looks dirty after frequent use but get cleaned easily. Worth buying bit suggested to explore others as similar quality is available in lesser price.',
		'Quality and colour is just perfect ! Just buy  it if u want a non skidding and super absorbent mat. The water is absorbed within 4 secs as promised. The packaging, pattern and colour all good.',
		'It does not dry immediately  .water remains on mat .Disappointed for quality.pl advice what should be done for quick drying.',
	];
	// break;
	// Add more cases for other websites as you create more functions
	// For example:
	// case "flipkart":
	//   reviews = await scrapeFlipkartReviews(url);
	//   break;
	// case "youtube":
	//   reviews = await scrapeYoutubeComments(url);
	//   break;
	// 	default:
	// 		// If the website name is not recognized, throw an error
	// 		throw new Error('Unsupported website: ' + website);
	// }
	// Return the reviews
	// console.log(reviews);
	return reviews;
}

// Export the function
module.exports = { scrapeReviews };
