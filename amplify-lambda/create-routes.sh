#!/bin/bash

API_ID="hg1o7gayml"
REGION="us-east-1"
FUNCTION_NAME="pantheons-newsletter-handler"

echo "Getting Lambda function ARN..."
FUNCTION_ARN=$(aws lambda get-function \
    --function-name $FUNCTION_NAME \
    --region $REGION \
    --query 'Configuration.FunctionArn' \
    --output text)

echo "Function ARN: $FUNCTION_ARN"

echo "Creating Lambda integration..."
INTEGRATION_ID=$(aws apigatewayv2 create-integration \
    --api-id $API_ID \
    --integration-type AWS_PROXY \
    --integration-uri $FUNCTION_ARN \
    --payload-format-version 2.0 \
    --region $REGION \
    --query 'IntegrationId' \
    --output text)

echo "Integration ID: $INTEGRATION_ID"

echo "Creating POST /newsletter route..."
aws apigatewayv2 create-route \
    --api-id $API_ID \
    --route-key 'POST /newsletter' \
    --target "integrations/$INTEGRATION_ID" \
    --region $REGION

echo "Creating OPTIONS /newsletter route..."
aws apigatewayv2 create-route \
    --api-id $API_ID \
    --route-key 'OPTIONS /newsletter' \
    --target "integrations/$INTEGRATION_ID" \
    --region $REGION

echo "Adding Lambda permission for API Gateway..."
aws lambda add-permission \
    --function-name $FUNCTION_NAME \
    --statement-id "apigateway-invoke-$(date +%s)" \
    --action lambda:InvokeFunction \
    --principal apigateway.amazonaws.com \
    --source-arn "arn:aws:execute-api:${REGION}:*:${API_ID}/*/*" \
    --region $REGION 2>/dev/null || echo "Permission might already exist"

echo ""
echo "Routes created successfully!"
echo "Your API endpoint: https://${API_ID}.execute-api.${REGION}.amazonaws.com/newsletter"
echo ""
echo "Test with: curl -X POST https://${API_ID}.execute-api.${REGION}.amazonaws.com/newsletter -H 'Content-Type: application/json' -d '{\"email\":\"test@example.com\"}'"