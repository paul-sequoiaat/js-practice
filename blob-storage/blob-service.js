require('dotenv').config();
const { BlobServiceClient } = require('@azure/storage-blob');
const { getReadStreamForFile } = require('../file-service/file-reader');
const path = require('path');

const connectionString = process.env.BLOB_STORAGE_CONNECTION_STRING;
const blobContainerName = process.env.BLOB_CONTAINER;
const blob = process.env.BLOB;
const filePath = path.join('resources', 'ACTOR_DVD_RENTAL.csv');

const getBlockBlobClient = async(blob) => {
    const containerClient = await getContainerClient();
    console.log('fetching blob client for blob', blob);
    return containerClient.getBlockBlobClient(blob);
}

const getContainerClient = async() => {
    const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
    console.log('fetching container client for container', blobContainerName);
    const containerClient = blobServiceClient.getContainerClient(blobContainerName);
    var containerExists = await containerClient.exists();
    if (!containerExists) {
        console.log('creating new container', blobContainerName);
        await containerClient.create();
    }
    console.log('fetched/created container', containerClient.containerName);

    return containerClient;
}

const uploadToBlobStorage = async(blob, path) => {
    const data = await getReadStreamForFile(path);
    console.log('data read from file', data.length);
    const blockBlobClient = await getBlockBlobClient(blob);
    console.log('uploading to blob', blob);
    return await blockBlobClient.uploadStream(data);
}

const downloadFromBlobStorage = async(blob) => {
    const blockBlobClient = await getBlockBlobClient(blob);
    const blobExists = await blockBlobClient.exists();
    if (!blobExists) {
        throw new Error("Cannot download content - Reason: Blob does not exist")
    }

    const blobContentBuffer = await blockBlobClient.downloadToBuffer(0);
    return blobContentBuffer.toString('utf-8');
}

const deleteAllBlobsInContainer = async() => {
    const containerClient = getContainerClient();
    for await (const blob of (await containerClient).listBlobsFlat()) {
        console.log('deleting blob', blob.name);
        const blobClient = (await containerClient).getBlobClient(blob.name);
        blobClient.delete();
    }
}

// uploadToBlobStorage(blob, filePath)
//     .then(res => {
//         if (res) console.log(`Blob upload success`)
//     })
//     .catch(err => console.log(`ERROR ${err}`));

downloadFromBlobStorage(blob)
    .then(res => console.log(`Blob Content :- ${res}`))
    .catch(err => console.log(`Error :- ${err}`));

