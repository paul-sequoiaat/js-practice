require('dotenv').config();
const { BlobServiceClient, ContainerClient } = require('@azure/storage-blob');

const connectionString = process.env.BLOB_STORAGE_CONNECTION_STRING;
const blobContainerName = process.env.BLOB_CONTAINER;

const blob = "data";
const blob1 = "data1";
const blob2 = "data2";
const blob3 = "data3";

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

const uploadToBlobStorage = async(blob, data) => {
    const blockBlobClient = await getBlockBlobClient(blob);
    var blobExists = await blockBlobClient.exists();
    if (blobExists) {
        console.log('Blob exists');
        return null;
    }
    console.log('uploading to blob storage');
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

// uploadToBlobStorage(blob3, "Bangalore").then(res => {
//     if (res) {
//         console.log(`Blob upload success`)
//     }})
//     .catch(err => console.log(`ERROR ${err}`));

// downloadFromBlobStorage(blob1)
//     .then(res => console.log(`Blob Content :- ${res}`))
//     .catch(err => console.log(`Error :- ${err}`));
