// langchain.js
// A function that takes an array of strings and returns a string that contains the summary of the text

// const { DiscussServiceClient } = require('@google-ai/generativelanguage');
// const { GoogleAuth } = require('google-auth-library');

// const MODEL_NAME = 'models/chat-bison-001';
// const API_KEY = process.env.GOOGLE_PALL_API_KEY;

// const client = new DiscussServiceClient({
// 	authClient: new GoogleAuth().fromAPIKey(API_KEY),
// });

// async function main() {
// 	let first = 'Tell me a one short animal fact.';
// 	let messages = [{ content: first }];

// 	const result = await client.generateMessage({
// 		model: MODEL_NAME,
// 		prompt: { messages },
// 	});

// 	console.log('User:\n\n', first, '\n\n');
// 	console.log('Palm:\n\n', result[0].candidates[0].content, '\n\n');

// 	let second = 'Oh, where do those live?';

// 	messages.push({ content: result[0].candidates[0].content });
// 	messages.push({ content: second });

// 	const secondResult = await client.generateMessage({
// 		model: MODEL_NAME,
// 		prompt: { messages },
// 	});

// 	console.log('User:\n\n', second, '\n\n');
// 	console.log('Palm:\n\n', secondResult[0].candidates[0].content, '\n\n');

// 	return secondResult[0].candidates[0].content;
// }

// main();

const { GooglePaLM } = require('langchain/llms/googlepalm');

const run = async (reviews) => {
	const model = new GooglePaLM({
		apiKey: `AIzaSyBTbYJL14DTHntDayfIWHiTtq4j5icsl-Q`, // or set it in environment variable as `GOOGLE_PALM_API_KEY`
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
		`I have collected some reviews, can you give a summary of how the customers feel about the product? Write that is more of sentance form don't give it too long make it a bit short and concise not more than 300-400 words unless it is really necessary you think and are leaving some important details. ${reviews}`
	);
	// console.log({ res });
	return res;
};

async function summarize(text) {
	// Create a new instance of the TextBison class with your Google PALL API key and other options
	// const summarizer = new TextBison({
	// 	googlePallApiKey: process.env.GOOGLE_PALL_API_KEY, // Your Google PALL API key
	// 	temperature: 0.9, // The randomness of the summary
	// 	maxTokens: 100, // The maximum length of the summary
	// });

	// Call the summarizer with the array of strings and get the summary
	// const summary = await summarizer.call(text);

	const summary = await run(text);

	// Return the summary
	return summary;
}

module.exports = { summarize };
