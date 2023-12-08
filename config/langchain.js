const { GooglePaLM } = require('langchain/llms/googlepalm');
const dotenv = require('dotenv');

dotenv.config();

const run = async (reviews) => {
	const model = new GooglePaLM({
		apiKey: process.env.GOOGLE_PALM_API_KEY,
		temperature: 1,
		modelName: 'models/text-bison-001',
	});

	const res = await model.call(
		`I have collected some reviews, can you give a summary of how the customers feel about the product? Write the summary professionally ${reviews}. Also don't add styling to it just simple text response. Don't add /n	or /r to the res, just simple text res`
	);
	const cleanedRes = res
		.replace(/[*]+/g, '')
		.replace(/[/]n/g, '')
		.replace(/[/]r/g, '')
		.replace(/[/]tab/g, '');
	return cleanedRes;
};

async function summarize(text) {
	const summary = await run(text);

	return summary;
}

module.exports = { summarize };
