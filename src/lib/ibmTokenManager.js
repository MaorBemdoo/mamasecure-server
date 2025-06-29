
const axios = require('axios');

let cachedToken = null;
let tokenExpiry = null;

const API_KEY = process.env.IBM_CLOUD_API_KEY;
const TOKEN_LIFESPAN = 60 * 60 * 1000;

async function generateIBMAccessToken(apiKey) {
    const url = 'https://iam.cloud.ibm.com/identity/token';
    const params = {
        'grant_type': 'urn:ibm:params:oauth:grant-type:apikey',
        'apikey': apiKey,
    }

    try {
        const response = await axios.post(url, params, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        return response.data.access_token;
    } catch (error) {
        console.error('Error generating IBM access token:', error.response?.data || error.message);
        throw error;
    }
}

async function getIBMToken() {
    const now = Date.now();
    if (!cachedToken || !tokenExpiry || now >= tokenExpiry) {
        const token = await generateIBMAccessToken(API_KEY);
        cachedToken = token;
        tokenExpiry = now + TOKEN_LIFESPAN - 60 * 1000;
    }
    return cachedToken;
}

module.exports = { getIBMToken };
