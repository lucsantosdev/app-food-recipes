export const environment = {
	apiKey: 'YOUR_API_KEY_HERE', // from https://spoonacular.com/food-api
};

/* 

***** STEP BY STEP INSTRUCTIONS *****

1. Go to https://spoonacular.com/food-api and sign up for a free account if you don't have one.

2. Once you have an account, log in and navigate to the API dashboard.

3. In the API dashboard, you will find your API key. It is a long string of letters and numbers.

4. Copy your API key and replace the placeholder 'YOUR_API_KEY_HERE' above. Make sure to keep the quotes around the key.

7. Save this file and rename it from 'environments-example.ts' to 'environments.ts'.

*** IMPORTANT NOTES ***

NOTE: The 7th step is crucial. The application is configured to import the API key from 'environments.ts'. If you do not rename the file, the application will not be able to find your API key and will not work properly.

NOTE: Do not share your API key publicly, as it is tied to your account and usage limits. If you need to share your code, use the 'environments-example.ts' file as a template without including your actual API key.

**** END OF INSTRUCTIONS *****
*/