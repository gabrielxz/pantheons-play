#!/bin/bash

# Get the API ID
API_ID=$(aws apigatewayv2 get-apis \
    --region us-east-1 \
    --query "Items[?Name=='pantheons-newsletter-handler-api'].ApiId" \
    --output text)

if [ -z "$API_ID" ]; then
    echo "API not found. Please check the API name."
    exit 1
fi

echo "Found API ID: $API_ID"
echo "Updating CORS configuration to allow ALL origins (*)..."

# Update CORS configuration to allow everything temporarily
aws apigatewayv2 update-api \
    --api-id $API_ID \
    --cors-configuration AllowOrigins="*",AllowHeaders="*",AllowMethods="*" \
    --region us-east-1

echo "CORS configuration updated!"
echo "API Gateway now accepts requests from ANY origin (*)"
echo ""
echo "IMPORTANT: Don't forget to also update the Lambda environment variable:"
echo "  ALLOWED_ORIGIN = *"
echo ""
echo "Once it works, you should restrict it back to: https://www.pantheonsplay.com"