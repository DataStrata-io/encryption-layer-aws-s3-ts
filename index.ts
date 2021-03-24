import { EncryptionLayer } from '@datastrata/aws-s3-encryption-layer';
import * as fs from 'fs';

const main = async () => {
    try {
        const testFileName = 'test-file.txt';

        const fileStream = fs.createReadStream(testFileName);
        fileStream.on('error', (err) => { console.log('File Error', err); });

        const encryptionLayer = new EncryptionLayer(
            'YOUR-REST-CREDENTIAL-CLIENT-ID',
            'YOUR-REST-CREDENTIAL-SECRET',
            'us-east-1');

        const uploadResult = await encryptionLayer.putObject({
            Bucket: 'datastrata-tutorial-bucket',
            Key: 'test-file-encrypted-ts.txt',
            Body: fileStream
        });

        const downloadResult = await encryptionLayer.getObject({
            Bucket: 'datastrata-tutorial-bucket',
            Key: 'test-file-encrypted-ts.txt'
        });

        console.log(downloadResult.Body.toString());

    } catch (e) {
        console.log(e);
    }
}

main();
