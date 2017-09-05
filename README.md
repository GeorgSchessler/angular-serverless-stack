# AngularServerlessStack

... under development

## Development server

Run `yarn start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `yarn ng generate component component-name` to generate a new component. You can also use `yarn ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `yarn ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `yarn ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `yarn ng serve`.

# Publish to AWS

## Prerequisite

To publish your code to AWS your need to 
- install the [Amazon CLI](https://aws.amazon.com/cli/)
- create an [Access Key](https://console.aws.amazon.com/iam/home?region=eu-west-1#/security_credential)
- set up your aws cli client in your terminal with: aws configure
- create a bucket: aws s3 mb s3://pa-lifecycle
- sync with bucket: aws s3 sync ./dist/ s3://pa-lifecycle
- create a website link: aws s3 website s3://pa-lifecycle --index-document index.html
- upload the default policy file to enable public access: aws s3api put-bucket-policy --bucket pa-lifecycle --policy '{"Version":"2012-10-17","Statement":[{"Sid":"AddPerm","Effect":"Allow","Principal": "*","Action":["s3:GetObject"],"Resource":["arn:aws:s3:::pa-lifecycle/*"]}]}'
- enable s3 website hosting: aws s3 website s3://pa-lifecycle --index-document index.html
- distribute on cdn: aws cloudfront create-distribution --cli-input-json '{"DistributionConfig": {"Comment": "", "CacheBehaviors": {"Quantity": 0}, "Logging": {"Bucket": "", "Prefix": "", "Enabled": false, "IncludeCookies": false}, "Origins": {"Items": [{"OriginPath": "/pa-lifecycle", "CustomOriginConfig": {"OriginProtocolPolicy": "http-only", "HTTPPort": 80, "HTTPSPort": 443}, "Id": "custom-s3-eu-west-1.amazonaws.com/pa-lifecycle", "DomainName": "s3-eu-west-1.amazonaws.com"}], "Quantity": 1}, "DefaultRootObject": "index.html", "PriceClass": "PriceClass_All", "Enabled": true, "DefaultCacheBehavior": {"TrustedSigners": {"Enabled": false, "Quantity": 0}, "TargetOriginId": "custom-s3-eu-west-1.amazonaws.com/pa-lifecycle", "ViewerProtocolPolicy": "allow-all", "ForwardedValues": {"Headers": {"Quantity": 0}, "Cookies": {"Forward": "none"}, "QueryString": false}, "SmoothStreaming": false, "AllowedMethods": {"Items": ["GET", "HEAD"], "CachedMethods": {"Items": ["GET", "HEAD"], "Quantity": 2 }, "Quantity": 2}, "MinTTL": 0}, "CallerReference": "Mon May 25 21:39:53 CEST 2015", "CustomErrorResponses": {"Quantity": 0}, "Restrictions": {"GeoRestriction": {"RestrictionType": "none", "Quantity": 0}}, "Aliases": {"Items": ["pa-lifecycle.com"], "Quantity": 1}}}'
