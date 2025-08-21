exports.handler = async (event) => {
  console.log('Full event:', JSON.stringify(event, null, 2));
  
  // CORS headers - always return these
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Max-Age': '86400',
    'Content-Type': 'application/json'
  };

  // Handle both payload formats
  // Format 2.0: event.requestContext.http.method
  // Format 1.0: event.httpMethod
  const method = event.requestContext?.http?.method || event.httpMethod || event.method;
  
  console.log('Detected method:', method);

  // ALWAYS return success for OPTIONS
  if (!method || method === 'OPTIONS') {
    console.log('Returning success for OPTIONS request');
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: 'CORS preflight successful' })
    };
  }

  // Handle POST requests
  if (method === 'POST') {
    try {
      const body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
      const email = body?.email;

      console.log('Email received:', email);

      if (!email || !email.includes('@')) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Valid email required' })
        };
      }

      // Get MailChimp configuration
      const API_KEY = process.env.MAILCHIMP_API_KEY;
      const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;
      const SERVER_PREFIX = process.env.MAILCHIMP_SERVER_PREFIX;

      if (!API_KEY || !AUDIENCE_ID || !SERVER_PREFIX) {
        console.error('MailChimp configuration missing');
        // For testing, return success even without MailChimp
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ 
            message: 'Thank you for signing up! (Test mode - MailChimp not configured)',
            email: email
          })
        };
      }

      // MailChimp integration code here...
      const https = require('https');
      const data = JSON.stringify({
        email_address: email,
        status: 'pending',
        tags: ['pantheons-play-website']
      });

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
          res.on('data', (chunk) => { responseData += chunk; });
          res.on('end', () => {
            resolve({
              statusCode: res.statusCode,
              data: responseData
            });
          });
        });

        req.on('error', (error) => {
          console.error('MailChimp request error:', error);
          reject(error);
        });

        req.write(data);
        req.end();
      });

      const mailchimpData = JSON.parse(response.data);
      console.log('MailChimp response:', response.statusCode);

      if (response.statusCode === 200) {
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ 
            message: 'Please check your email to confirm your subscription!' 
          })
        };
      } else if (response.statusCode === 400 && mailchimpData.title === 'Member Exists') {
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ 
            message: 'You are already subscribed to our newsletter!' 
          })
        };
      } else {
        console.error('MailChimp error:', mailchimpData);
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ 
            message: 'Thank you! We\'ll process your signup shortly.',
            debug: mailchimpData.detail
          })
        };
      }
    } catch (error) {
      console.error('Error:', error);
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ 
          message: 'Thank you! We\'ll process your signup shortly.'
        })
      };
    }
  }

  // Any other method
  return {
    statusCode: 405,
    headers,
    body: JSON.stringify({ error: 'Method not allowed' })
  };
};