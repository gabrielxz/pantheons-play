const https = require('https');

exports.handler = async (event) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': process.env.ALLOWED_ORIGIN || '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'OPTIONS,POST',
    'Content-Type': 'application/json'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: 'OK' })
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Parse request body
    const { email } = JSON.parse(event.body || '{}');

    // Validate email
    if (!email || !email.includes('@')) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Valid email required' })
      };
    }

    // Get MailChimp configuration from environment variables
    const API_KEY = process.env.MAILCHIMP_API_KEY;
    const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;
    const SERVER_PREFIX = process.env.MAILCHIMP_SERVER_PREFIX;

    if (!API_KEY || !AUDIENCE_ID || !SERVER_PREFIX) {
      console.error('MailChimp configuration missing');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Newsletter service not configured' })
      };
    }

    // Prepare MailChimp API request
    const data = JSON.stringify({
      email_address: email,
      status: 'pending', // Double opt-in
      tags: ['pantheons-play-website']
    });

    // Make request to MailChimp API
    const response = await new Promise((resolve, reject) => {
      const options = {
        hostname: `${SERVER_PREFIX}.api.mailchimp.com`,
        port: 443,
        path: `/3.0/lists/${AUDIENCE_ID}/members`,
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(data)
        }
      };

      const req = https.request(options, (res) => {
        let responseData = '';

        res.on('data', (chunk) => {
          responseData += chunk;
        });

        res.on('end', () => {
          resolve({
            statusCode: res.statusCode,
            data: responseData
          });
        });
      });

      req.on('error', (error) => {
        reject(error);
      });

      req.write(data);
      req.end();
    });

    const mailchimpData = JSON.parse(response.data);

    // Handle MailChimp response
    if (response.statusCode === 200) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ 
          message: 'Please check your email to confirm your subscription!' 
        })
      };
    } else if (response.statusCode === 400 && mailchimpData.title === 'Member Exists') {
      // User already subscribed
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ 
          message: 'You are already subscribed to our newsletter!' 
        })
      };
    } else {
      // Other errors
      console.error('MailChimp error:', mailchimpData);
      return {
        statusCode: response.statusCode || 500,
        headers,
        body: JSON.stringify({ 
          error: mailchimpData.detail || 'Failed to subscribe. Please try again.' 
        })
      };
    }

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'An error occurred. Please try again later.' 
      })
    };
  }
};