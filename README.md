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
- enable cloudfron preview commands: aws configure set preview.cloudfront true

## Init aws instance

Run `yarn aws:create` to initialize 
