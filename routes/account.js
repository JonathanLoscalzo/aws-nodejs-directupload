var express = require('express');
var router = express.Router();

const aws = require('aws-sdk');

const S3_BUCKET = process.env.AWS_S3_BUCKET;
const AWSAccessKeyId = process.env.AWS_AccessKeyId;
const AWSSecretKey = process.env.AWS_SecretKey;

aws.config.region = process.env.AWS_REGION;
aws.config.accessKeyId = AWSAccessKeyId;
aws.config.secretAccessKey = AWSSecretKey;


router.get('/', (req, res) => {
    res.render('account');
});

router.get('/sign-s3', (req, res) => {
    const s3 = new aws.S3();
    const fileName = "portfolio/user-profile/prueba-cualquier-nombre-" + req.query['file-name'];
    const fileType = req.query['file-type'];
    const s3Params = {
        Bucket: S3_BUCKET,
        Key: fileName,
        Expires: 60,
        ContentType: fileType,
        ACL: 'public-read'
    };

    s3.getSignedUrl('putObject', s3Params, (err, data) => {
        if (err) {
            console.log(err);
            return res.end();
        }
        const returnData = {
            signedRequest: data,
            url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
        };
        res.write(JSON.stringify(returnData));
        res.end();
    });
});

router.post('/save-details', (req, res) => {
    // TODO: Read POSTed form data and do something useful
    debugger;
    console.log(req, res);
});

module.exports = router;