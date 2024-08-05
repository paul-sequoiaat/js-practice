require('dotenv').config();
const { BlobServiceClient } = require('@azure/storage-blob');
const { QueueServiceClient } = require('@azure/storage-queue');

const connectionString = process.env.CONNECTION_STRING;
const blobContainer = process.env.BLOB_CONTAINER;
const queue = process.env.QUEUE;

const fetchBlockBlobClient = async(blob) => {
    const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
    const containerClient = blobServiceClient.getContainerClient(blobContainer);
    const blockBlobClient = containerClient.getBlockBlobClient(blob);
    const blobExists = await blockBlobClient.exists();
    if (!blobExists) {
        throw new Error("Cannot download content - Reason: Blob does not exist")
    }
    return blockBlobClient;
}

const processBLOBAndPushToQueue = async(data) => {
    var rows = data.toString().split("\n").map(r => r.trim().split(','));
    const headers = rows.shift();   //remove headers
    console.log('data size', rows.length);
    rows = rows.map(row => {
        let json = {};
        headers.forEach((header, index) => {
            json[header] = row[index];
        });
        return json;
    });
    const queueClient = await getQueueClient();
    while (rows.length > 0) {
        const message = rows.splice(0, 100);
        console.log('batch size', message.length);
        await pushMessageToQueue(message, queueClient);
    }
}

const pushMessageToQueue = async(data, queueClient) => {
    const message = jsonToBase64(data);
    queueClient.sendMessage(message);
    console.log('Message pushed to queue');
}

const jsonToBase64 = (jsonObj) => {
    const jsonString = JSON.stringify(jsonObj);
    return Buffer.from(jsonString).toString('base64');
}

const getQueueClient = async() => {
    const queueServiceClient = QueueServiceClient.fromConnectionString(connectionString);
    const queueClient = queueServiceClient.getQueueClient(queue);
    const queueExists = await queueClient.exists();
    if (!queueExists) {
        console.log('creating new queue', queue);
        queueClient.create();
    }
    console.log('fetched queue client: ', queueClient.name);
    return queueClient;
}

module.exports = { fetchBlockBlobClient, processBLOBAndPushToQueue };
