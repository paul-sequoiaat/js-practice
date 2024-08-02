require('dotenv').config();
const { BlobServiceClient } = require('@azure/storage-blob');
const { insert } = require('../../postgres/db-utils');

const connectionString = process.env.BLOB_STORAGE_CONNECTION_STRING;
const blobContainer = process.env.BLOB_CONTAINER;
const query = "INSERT INTO user_data (name, last_update) VALUES %L";

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

const processBLOBtoSQLAndInsertIntoDB = async(data) => {
    var rows = data.toString().split("\n");
    rows.shift();   //remove headers
    rows = rows.map(row => [row.split(",")[1], row.split(",")[2]]);     
    rows = rows.filter(row => row[0] != null && row[1] != null);    //remove null values
    return await insert(query, rows);
}

module.exports = { fetchBlockBlobClient, processBLOBtoSQLAndInsertIntoDB };
