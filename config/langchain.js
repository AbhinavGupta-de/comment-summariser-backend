const { GooglePaLM } = require('langchain/llms/googlepalm');
const dotenv = require('dotenv');

dotenv.config();

const run = async (reviews) => {
	const model = new GooglePaLM({
		apiKey: process.env.GOOGLE_PALM_API_KEY, // or set it in environment variable as `GOOGLE_PALM_API_KEY`
		// other params
		temperature: 1, // OPTIONAL
		modelName: 'models/text-bison-001', // OPTIONAL
		safetySettings: [
			// OPTIONAL
			{
				category: 'HARM_CATEGORY_DANGEROUS',
				threshold: 'BLOCK_MEDIUM_AND_ABOVE',
			},
		],
		stopSequences: ['stop'], // OPTIONAL
	});

	const res = await model.call(
		`I have collected some reviews, can you give a summary of how the customers feel about the product? ${reviews}`
	);
	// console.log({ res });
	return res;
};

async function summarize(text) {
	const summary = await run(text);

	// summary = summary.replace('/n', '');

	return summary;
}

module.exports = { summarize };
