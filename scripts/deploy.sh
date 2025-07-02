#!/bin/bash

# 🚀 LILOU LOGISTIQUE - Local Deployment Script
# This script handles local/manual deployments to various platforms

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Default values
ENVIRONMENT="staging"
PLATFORM="vercel"
SKIP_TESTS=false
SKIP_BUILD=false

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Function to show usage
show_usage() {
    echo "🚀 LILOU LOGISTIQUE Deployment Script"
    echo ""
    echo "Usage: $0 [OPTIONS]"
    echo ""
    echo "Options:"
    echo "  -e, --environment ENV    Target environment (staging|production) [default: staging]"
    echo "  -p, --platform PLATFORM Deployment platform (vercel|netlify|aws) [default: vercel]"
    echo "  -s, --skip-tests        Skip running tests"
    echo "  -b, --skip-build        Skip build step (use existing build)"
    echo "  -h, --help              Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 -e production -p vercel"
    echo "  $0 --environment staging --platform netlify --skip-tests"
    echo ""
}

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        -e|--environment)
            ENVIRONMENT="$2"
            shift 2
            ;;
        -p|--platform)
            PLATFORM="$2"
            shift 2
            ;;
        -s|--skip-tests)
            SKIP_TESTS=true
            shift
            ;;
        -b|--skip-build)
            SKIP_BUILD=true
            shift
            ;;
        -h|--help)
            show_usage
            exit 0
            ;;
        *)
            print_error "Unknown option: $1"
            show_usage
            exit 1
            ;;
    esac
done

# Validate environment
if [[ "$ENVIRONMENT" != "staging" && "$ENVIRONMENT" != "production" ]]; then
    print_error "Invalid environment: $ENVIRONMENT. Must be 'staging' or 'production'"
    exit 1
fi

# Validate platform
if [[ "$PLATFORM" != "vercel" && "$PLATFORM" != "netlify" && "$PLATFORM" != "aws" ]]; then
    print_error "Invalid platform: $PLATFORM. Must be 'vercel', 'netlify', or 'aws'"
    exit 1
fi

print_status "Starting deployment to $ENVIRONMENT environment on $PLATFORM platform"

# Check if we're in the right directory
if [[ ! -f "package.json" ]]; then
    print_error "package.json not found. Please run this script from the project root."
    exit 1
fi

# Check for required environment files
ENV_FILE=".env.local"
if [[ "$ENVIRONMENT" == "production" ]]; then
    ENV_FILE=".env.production.local"
elif [[ "$ENVIRONMENT" == "staging" ]]; then
    ENV_FILE=".env.staging.local"
fi

if [[ ! -f "$ENV_FILE" ]]; then
    print_warning "Environment file $ENV_FILE not found. Using .env.local as fallback."
fi

# Install dependencies
print_status "Installing dependencies..."
npm ci

# Validate environment variables
print_status "Validating environment configuration..."
npm run validate-env

# Run tests unless skipped
if [[ "$SKIP_TESTS" == false ]]; then
    print_status "Running tests..."
    npm run test
else
    print_warning "Skipping tests as requested"
fi

# Type check
print_status "Running type check..."
npm run type-check

# Build unless skipped
if [[ "$SKIP_BUILD" == false ]]; then
    print_status "Building application..."
    NODE_ENV=production npm run build
else
    print_warning "Skipping build as requested"
fi

# Deploy based on platform
case $PLATFORM in
    vercel)
        print_status "Deploying to Vercel..."
        if [[ "$ENVIRONMENT" == "production" ]]; then
            npx vercel --prod --yes
        else
            npx vercel --yes
        fi
        ;;
    netlify)
        print_status "Deploying to Netlify..."
        if command -v netlify &> /dev/null; then
            if [[ "$ENVIRONMENT" == "production" ]]; then
                netlify deploy --prod --dir=out
            else
                netlify deploy --dir=out
            fi
        else
            print_error "Netlify CLI not found. Install with: npm install -g netlify-cli"
            exit 1
        fi
        ;;
    aws)
        print_status "Deploying to AWS..."
        if command -v aws &> /dev/null; then
            # Check for required AWS environment variables
            if [[ -z "$AWS_S3_BUCKET" || -z "$AWS_CLOUDFRONT_DISTRIBUTION_ID" ]]; then
                print_error "AWS deployment requires AWS_S3_BUCKET and AWS_CLOUDFRONT_DISTRIBUTION_ID environment variables"
                exit 1
            fi
            
            print_status "Syncing to S3 bucket: $AWS_S3_BUCKET"
            aws s3 sync ./out s3://$AWS_S3_BUCKET --delete
            
            print_status "Invalidating CloudFront distribution: $AWS_CLOUDFRONT_DISTRIBUTION_ID"
            aws cloudfront create-invalidation --distribution-id $AWS_CLOUDFRONT_DISTRIBUTION_ID --paths "/*"
        else
            print_error "AWS CLI not found. Please install AWS CLI first."
            exit 1
        fi
        ;;
esac

print_success "🎉 Deployment to $ENVIRONMENT environment completed successfully!"

# Show deployment info
case $PLATFORM in
    vercel)
        print_status "Your application should be available at your Vercel domain"
        ;;
    netlify)
        print_status "Your application should be available at your Netlify domain"
        ;;
    aws)
        print_status "Your application should be available at your CloudFront domain"
        ;;
esac

print_status "Deployment completed at: $(date)"