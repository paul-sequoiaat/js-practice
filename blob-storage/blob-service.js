require('dotenv').config();
const { BlobServiceClient } = require('@azure/storage-blob');
const { readContentFromFile } = require('../file-service/file-reader');
const path = require('path');

const connectionString = process.env.BLOB_STORAGE_CONNECTION_STRING;
const blobContainerName = process.env.BLOB_CONTAINER;
const blob = "data";
const filePath = path.join('resources', 'ACTOR_DVD_RENTAL.csv');

const getBlockBlobClient = async(blob) => {
    const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
    
    const containerClient = blobServiceClient.getContainerClient(blobContainerName);
    var containerExists = await containerClient.exists();
    if (!containerExists) {
        console.log('creating new container');
        await containerClient.create();
    }

    return containerClient.getBlockBlobClient(blob);
}

const uploadToBlobStorage = async(blob, path) => {
    const data = await readContentFromFile(path);
    const blockBlobClient = await getBlockBlobClient(blob);
    console.log('uploading to blob storage');
    console.log('data length', data.length);
    return await blockBlobClient.upload(data, data.length);
}

const downloadFromBlobStorage = async(blob) => {
    const blockBlobClient = await getBlockBlobClient(blob);
    const blobExists = await blockBlobClient.exists();
    if (!blobExists) {
        throw new Error("Cannot download content - Reason: Block does not exist")
    }

    const blobContentBuffer = await blockBlobClient.downloadToBuffer(0);
    return blobContentBuffer.toString('utf-8');
}

// uploadToBlobStorage(blob, filePath).then(res => {
//     if (res) {
//         console.log(`Blob upload success`)
//     }})
//     .catch(err => console.log(`ERROR ${err}`));

// downloadFromBlobStorage(blob)
//     .then(res => console.log(`Blob Content :- ${res}`))
//     .catch(err => console.log(`Error :- ${err}`));
