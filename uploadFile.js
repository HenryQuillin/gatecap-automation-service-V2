const AWS = require('aws-sdk');
const fs = require('fs');

// Enter copied or downloaded access ID and secret key here
const ID = 'AKIA5U3HRXHOVEQDWT32';
const SECRET = '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';

// The name of the bucket that you have created
const BUCKET_NAME = 'gatecap-automation-service';

const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET
});

const uploadFile = async (fileName, fileKey, folderName) => {
    // Read content from the file
    const fileContent = fs.readFileSync(fileName);

    // Setting up S3 upload parameters
    const params = {
        Bucket: BUCKET_NAME,
        Key: `${folderName}/${fileKey}`, // File name you want to save as in S3
        Body: fileContent
    };

    // Uploading files to the bucket
    try {
        const data = await s3.upload(params).promise();
        console.log(`File uploaded successfully. ${data.Location}`);
    } catch (err) {
        console.log('Error uploading file:', err);
    }
};

module.exports = {
    uploadFile: uploadFile,
  };