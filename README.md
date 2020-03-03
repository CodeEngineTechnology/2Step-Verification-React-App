# 2-Step Vericifation App<br/>

## Prerequisites

Install Node<br/>
AWS account<br/><br/>

## React App

### `npm init react-app mfa`

### `cd mfa`

### `npm install --save bootstrap`

### `npm install --save reactstrap react react-dom`

### `npm start`

#### Add bootstrap to App.js file :

`import 'bootstrap/dist/css/bootstrap.min.css';`

## Lambda Function (Node.js)

### Give the Lambda function access to SNS (AmazonSNSFullAccess)

    var AWS = require('aws-sdk');

    exports.handler = (event, context, callback) => {


        var sns = new AWS.SNS();
        var params = {
            Message: event.message,
            MessageStructure: 'string',
            PhoneNumber: event.number,
            Subject: event.subject

        };



        sns.publish(params, function(err, data) {
            if (err) console.log(err, err.stack); // an error occurred
            else     console.log(data);           // successful response
        });

    };

## API Gateway

### Create a REST API

### Add POST method

### Enable CORS

### Deploy API<br/><br/>

### Copy the Endpoint to your env file

### I urge you to add the .env file to your .gitignore

## Setup S3 Website

### `npm run build`

### Create S3 bucket

### Allow public access

### Enable static website hosting (index.html)

### Add the following bucket policy

    {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Sid": "ListObjectsInBucket",
                "Effect": "Allow",
                "Principal": "*",
                "Action": "s3:GetObject",
                "Resource": "arn:aws:s3:::YOUR-BUCKET-NAME/*"
            }
        ]
    }

## AWS CloudFront (CDN / HTPS) & WAF

### Fast, highly secure and programmable content delivery network (CDN)

### AWS CloudFront integrates seamlessly with AWS defend for Layer 3/4 DDoS mitigation and AWS WAF for Layer seven protection. <br><br>

## KMS 

### In order to take this app to the next level you can encrypt the code using KMS and store the encrypted code along with the user's phone number in Redis as a key,value pair. You can also 
