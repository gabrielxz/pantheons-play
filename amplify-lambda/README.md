# Newsletter Lambda Function Deployment Guide

This Lambda function handles newsletter signups for Pantheons Play, integrating with MailChimp API securely on the server side.

## Prerequisites

1. **AWS CLI** installed and configured with your credentials
   ```bash
   aws configure
   ```

2. **MailChimp Account** with:
   - API Key
   - Audience/List ID
   - Server prefix (e.g., us21)

## Quick Deployment

1. **Navigate to the Lambda directory:**
   ```bash
   cd amplify-lambda
   ```

2. **Run the deployment script:**
   ```bash
   ./deploy.sh
   ```

   The script will:
   - Create/update the Lambda function
   - Set up IAM roles automatically
   - Create API Gateway with CORS configured
   - Output your API endpoint URL

## Manual Deployment Steps

If the script doesn't work, follow these manual steps:

### 1. Create Lambda Function

1. Go to [AWS Lambda Console](https://console.aws.amazon.com/lambda)
2. Click "Create function"
3. Choose "Author from scratch"
4. Function name: `pantheons-newsletter-handler`
5. Runtime: Node.js 18.x
6. Click "Create function"

### 2. Upload Code

1. In the Lambda function, click "Upload from" → ".zip file"
2. Create zip file:
   ```bash
   zip -r function.zip index.js package.json
   ```
3. Upload the zip file

### 3. Set Environment Variables

In the Lambda console, go to Configuration → Environment variables and add:

| Key | Value | Description |
|-----|-------|-------------|
| `MAILCHIMP_API_KEY` | `your-api-key` | Get from MailChimp Account → Extras → API keys |
| `MAILCHIMP_AUDIENCE_ID` | `your-list-id` | Get from Audience → Settings → Audience ID |
| `MAILCHIMP_SERVER_PREFIX` | `us21` | The datacenter from your API key (e.g., us21) |
| `ALLOWED_ORIGIN` | `https://www.pantheonsplay.com` | Your website URL for CORS |

### 4. Create API Gateway

1. Go to [API Gateway Console](https://console.aws.amazon.com/apigateway)
2. Create HTTP API
3. Add integration → Lambda → Select your function
4. Configure routes:
   - POST /newsletter
   - OPTIONS /newsletter (for CORS)
5. Configure CORS:
   - Access-Control-Allow-Origin: `https://www.pantheonsplay.com`
   - Access-Control-Allow-Headers: `Content-Type`
   - Access-Control-Allow-Methods: `POST, OPTIONS`

### 5. Get Your API Endpoint

After creating the API Gateway, you'll get an endpoint like:
```
https://abc123xyz.execute-api.us-east-1.amazonaws.com/newsletter
```

## Update Your Website

1. **Add the API endpoint to Amplify environment variables:**
   - Go to AWS Amplify Console
   - Environment variables
   - Add: `NEXT_PUBLIC_NEWSLETTER_API_URL` = your API endpoint

2. **Redeploy your Amplify app**

## Testing

### Test Lambda Function Directly

Create a test event in Lambda console:
```json
{
  "httpMethod": "POST",
  "body": "{\"email\":\"test@example.com\"}"
}
```

### Test via cURL

```bash
curl -X POST https://your-api-endpoint/newsletter \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

### Expected Responses

**Success:**
```json
{
  "message": "Please check your email to confirm your subscription!"
}
```

**Already Subscribed:**
```json
{
  "message": "You are already subscribed to our newsletter!"
}
```

**Error:**
```json
{
  "error": "Valid email required"
}
```

## Troubleshooting

### CORS Errors
- Ensure `ALLOWED_ORIGIN` environment variable matches your website URL exactly
- Check API Gateway CORS configuration

### 500 Internal Server Error
- Check Lambda logs in CloudWatch
- Verify all environment variables are set correctly
- Ensure MailChimp API key is valid

### Timeout Issues
- Increase Lambda timeout (default is 10 seconds)
- Check Lambda memory allocation (128MB should be sufficient)

### MailChimp Errors
- Verify API key has correct permissions
- Check audience ID is correct
- Ensure server prefix matches your MailChimp datacenter

## Monitoring

View logs and metrics:
1. Lambda Console → Monitor tab → View logs in CloudWatch
2. API Gateway Console → Monitoring → CloudWatch logs

## Costs

Estimated monthly costs for moderate traffic (1000 signups/month):
- Lambda: ~$0.01
- API Gateway: ~$0.01
- Total: < $0.10/month

## Security Notes

- API keys are stored securely as Lambda environment variables
- CORS is configured to only allow your domain
- Lambda function validates email format
- MailChimp handles double opt-in for GDPR compliance

## Support

For issues specific to:
- **Lambda/AWS**: Check CloudWatch logs
- **MailChimp**: Check MailChimp API documentation
- **Frontend**: Check browser console for errors