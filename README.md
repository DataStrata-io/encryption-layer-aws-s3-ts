# Client Side AWS S3 Encryption Layer from DataStrata.io: Typescript
Typescript example of client-side encryption on AWS S3 using DataStrata.io Encryption Layers

## Prerequisites

Configure an Encryption Layer at DataStrata.io. [Here are some tips](https://datastrata.io/encryption-layer-overview-and-getting-started/) to get started with configuration.

## Getting Started

### From respository

You can download this example from:

https://github.com/DataStrata-io/encryption-layer-aws-s3-ts.git

1. Clone the repository: `git clone https://github.com/DataStrata-io/encryption-layer-aws-s3-ts.git`

2. Change into the directory: `cd encryption-layer-aws-s3-js`

3. Install the dependency: `npm install`

4. Replace `YOUR-REST-CREDENTIAL-CLIENT-ID` and `YOUR-REST-CREDENTIAL-SECRET` with the values you configured at [DataStrata.io: Getting Started with Encryption Layers](https://datastrata.io/encryption-layer-overview-and-getting-started/).

5. Run the index.ts file by typing: `npx ts-node index.ts` (note that in some IDEs, just `ts-node index.ts` sufficient). You should see the contents of the uploaded file. If you used the `test-file.txt` in the repository, you will see:

### From scratch

1. Create a directory and setup a Node.js project package.json. Quick one:

`npm init -y`

2. Install the npm package @Datastrata/.

`npm i @datastrata/aws-s3-encryption-layer`

3. Install typescript packages:

`npm install typescript --save-dev`

4. Add Node types:

`npm install @types/node --save-dev`

5. Add ts-node for compiling:

`npm install ts-node --save-dev`

6. Setup a tsconfig.json file:

`npx tsc --init --rootDir src --outDir lib --resolveJsonModule --lib es6,dom  --module commonjs`

7. Create an index.ts file with the following code:

import { EncryptionLayer } from '@datastrata/aws-s3-encryption-layer';
import * as fs from 'fs';

      const main = async () => {
         try {
              const testBucketName = 'YOUR-BUCKET-NAME';
              const testKey = 'test-file-encrypted-ts.txt';
              const testFileName = 'test-file.txt';
      
              const fileStream = fs.createReadStream(testFileName);
              fileStream.on('error', (err) => { console.log('File Error', err); });
      
              const encryptionLayer = new EncryptionLayer(
                  'YOUR-REST-CREDENTIAL-CLIENT-ID',
                  'YOUR-REST-CREDENTIAL-SECRET',
                  'us-east-1');
      
              const uploadResult = await encryptionLayer.putObject({
                  Bucket: testBucketName,
                  Key: testKey,
                  Body: fileStream
              });
      
              console.log('Object uploaded');
      
              const downloadResult = await encryptionLayer.getObject({
                  Bucket: testBucketName,
                  Key: testKey
              });
      
              console.log('Object downloaded');
              console.log(downloadResult.Body.toString());
      
              const deleteResult = await encryptionLayer.deleteObject(    {
                  Bucket: testBucketName,
                  Key: testKey
              });
      
              console.log('Object deleted');
          } catch (e) {
              console.log(e);
          }
      }
      
      main();

8. Replace `YOUR-REST-CREDENTIAL-CLIENT-ID` and `YOUR-REST-CREDENTIAL-SECRET` with the values you configured at [DataStrata.io: Getting Started with Encryption Layers](https://datastrata.io/encryption-layer-overview-and-getting-started/).


9. Run the file by typing: `npx ts-node index.ts` (note that in some IDEs, just `ts-node index.ts` sufficient). You should see the contents of the uploaded file. If you used the `test-file.txt` in the repository, you will see:

> Welcome to DataStrata.io Encryption Layers, client-side encryption for your data.

