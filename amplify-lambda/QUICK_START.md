# 🚀 Quick Start - Newsletter Lambda Setup

## Step 1: Deploy the Lambda Function

```bash
cd amplify-lambda
./deploy.sh
```

This will output your API endpoint URL, something like:
```
API Endpoint: https://abc123.execute-api.us-east-1.amazonaws.com/newsletter
```

## Step 2: Configure Lambda Environment Variables

Go to [AWS Lambda Console](https://console.aws.amazon.com/lambda) → Your function → Configuration → Environment variables

Add these 4 variables:
- `MAILCHIMP_API_KEY` = (your MailChimp API key)
- `MAILCHIMP_AUDIENCE_ID` = (your list ID)  
- `MAILCHIMP_SERVER_PREFIX` = us21 (or your datacenter)
- `ALLOWED_ORIGIN` = https://www.pantheonsplay.com

## Step 3: Update Amplify Environment Variables

In AWS Amplify Console → Environment variables, add:
- `NEXT_PUBLIC_NEWSLETTER_API_URL` = (the API endpoint from Step 1)

## Step 4: Redeploy Your Site

Push your changes or trigger a manual redeploy in Amplify.

## That's It! 🎉

Your newsletter signup will now work through the secure Lambda function.

### Test It
Try signing up with an email address on your site. You should see:
- "Please check your email to confirm your subscription!" for new signups
- "You are already subscribed to our newsletter!" for existing subscribers