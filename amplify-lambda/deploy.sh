#!/bin/bash

# Configuration
FUNCTION_NAME="pantheons-newsletter-handler"
REGION="us-east-1"  # Change this to your preferred region
RUNTIME="nodejs18.x"
HANDLER="index.handler"
TIMEOUT=10
MEMORY_SIZE=128

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Starting Lambda deployment for Pantheons Newsletter Handler${NC}"

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo -e "${RED}AWS CLI is not installed. Please install it first.${NC}"
    echo "Visit: https://aws.amazon.com/cli/"
    exit 1
fi

# Check AWS credentials
echo -e "${YELLOW}Checking AWS credentials...${NC}"
if ! aws sts get-caller-identity &> /dev/null; then
    echo -e "${RED}AWS credentials not configured. Please run 'aws configure'${NC}"
    exit 1
fi

# Create deployment package
echo -e "${YELLOW}Creating deployment package...${NC}"
rm -f function.zip
zip -r function.zip index.js package.json

# Check if Lambda function exists
echo -e "${YELLOW}Checking if Lambda function exists...${NC}"
if aws lambda get-function --function-name $FUNCTION_NAME --region $REGION &> /dev/null; then
    # Update existing function
    echo -e "${YELLOW}Updating existing Lambda function...${NC}"
    aws lambda update-function-code \
        --function-name $FUNCTION_NAME \
        --zip-file fileb://function.zip \
        --region $REGION
    
    echo -e "${GREEN}Lambda function code updated successfully!${NC}"
else
    # Create new function
    echo -e "${YELLOW}Creating new Lambda function...${NC}"
    
    # First, we need to create an IAM role for the Lambda function
    echo -e "${YELLOW}Creating IAM role...${NC}"
    
    # Create trust policy
    cat > trust-policy.json <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
EOF

    # Create the role
    ROLE_ARN=$(aws iam create-role \
        --role-name ${FUNCTION_NAME}-role \
        --assume-role-policy-document file://trust-policy.json \
        --query 'Role.Arn' \
        --output text 2>/dev/null)
    
    if [ -z "$ROLE_ARN" ]; then
        # Role might already exist
        ROLE_ARN=$(aws iam get-role \
            --role-name ${FUNCTION_NAME}-role \
            --query 'Role.Arn' \
            --output text)
    fi
    
    # Attach basic execution policy
    aws iam attach-role-policy \
        --role-name ${FUNCTION_NAME}-role \
        --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole
    
    # Wait for role to propagate
    echo -e "${YELLOW}Waiting for IAM role to propagate...${NC}"
    sleep 10
    
    # Create the Lambda function
    aws lambda create-function \
        --function-name $FUNCTION_NAME \
        --runtime $RUNTIME \
        --role $ROLE_ARN \
        --handler $HANDLER \
        --timeout $TIMEOUT \
        --memory-size $MEMORY_SIZE \
        --zip-file fileb://function.zip \
        --region $REGION
    
    echo -e "${GREEN}Lambda function created successfully!${NC}"
    
    # Clean up
    rm trust-policy.json
fi

# Set environment variables
echo -e "${YELLOW}Setting environment variables...${NC}"
echo -e "${YELLOW}Please update these values in the AWS Lambda console:${NC}"
echo "  - MAILCHIMP_API_KEY: Your MailChimp API key"
echo "  - MAILCHIMP_AUDIENCE_ID: Your MailChimp audience/list ID"
echo "  - MAILCHIMP_SERVER_PREFIX: Your MailChimp server prefix (e.g., us21)"
echo "  - ALLOWED_ORIGIN: https://www.pantheonsplay.com"

# Create API Gateway
echo -e "${YELLOW}Setting up API Gateway...${NC}"

# Check if API exists
API_ID=$(aws apigatewayv2 get-apis \
    --region $REGION \
    --query "Items[?Name=='${FUNCTION_NAME}-api'].ApiId" \
    --output text)

if [ -z "$API_ID" ]; then
    # Create new HTTP API
    echo -e "${YELLOW}Creating new HTTP API...${NC}"
    API_ID=$(aws apigatewayv2 create-api \
        --name ${FUNCTION_NAME}-api \
        --protocol-type HTTP \
        --cors-configuration "AllowOrigins=*,AllowMethods=POST,OPTIONS,AllowHeaders=content-type" \
        --region $REGION \
        --query 'ApiId' \
        --output text)
fi

# Get Lambda function ARN
FUNCTION_ARN=$(aws lambda get-function \
    --function-name $FUNCTION_NAME \
    --region $REGION \
    --query 'Configuration.FunctionArn' \
    --output text)

# Create or update integration
INTEGRATION_ID=$(aws apigatewayv2 get-integrations \
    --api-id $API_ID \
    --region $REGION \
    --query "Items[0].IntegrationId" \
    --output text)

if [ "$INTEGRATION_ID" == "None" ] || [ -z "$INTEGRATION_ID" ]; then
    INTEGRATION_ID=$(aws apigatewayv2 create-integration \
        --api-id $API_ID \
        --integration-type AWS_PROXY \
        --integration-uri $FUNCTION_ARN \
        --payment-type PAYMENT_TYPE_1 \
        --region $REGION \
        --query 'IntegrationId' \
        --output text)
fi

# Create route
aws apigatewayv2 create-route \
    --api-id $API_ID \
    --route-key 'POST /newsletter' \
    --target integrations/$INTEGRATION_ID \
    --region $REGION &> /dev/null

aws apigatewayv2 create-route \
    --api-id $API_ID \
    --route-key 'OPTIONS /newsletter' \
    --target integrations/$INTEGRATION_ID \
    --region $REGION &> /dev/null

# Add permission for API Gateway to invoke Lambda
aws lambda add-permission \
    --function-name $FUNCTION_NAME \
    --statement-id apigateway-invoke \
    --action lambda:InvokeFunction \
    --principal apigateway.amazonaws.com \
    --source-arn "arn:aws:execute-api:${REGION}:*:${API_ID}/*/*" \
    --region $REGION &> /dev/null

# Get API endpoint
API_ENDPOINT=$(aws apigatewayv2 get-api \
    --api-id $API_ID \
    --region $REGION \
    --query 'ApiEndpoint' \
    --output text)

# Clean up
rm -f function.zip

echo -e "${GREEN}Deployment complete!${NC}"
echo -e "${GREEN}API Endpoint: ${API_ENDPOINT}/newsletter${NC}"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "1. Go to AWS Lambda console and set the environment variables"
echo "2. Update your frontend to use the API endpoint: ${API_ENDPOINT}/newsletter"
echo "3. Test the newsletter signup!"