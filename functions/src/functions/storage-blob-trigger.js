const { app } = require('@azure/functions');
const { BlobServiceClient } = require('@azure/storage-blob');
const { insert } = require('../../../postgres/db-utils');

const blobContainer = "sequoia";
const connectionString = "UseDevelopmentStorage=true"; 

app.storageBlob('storage-blob-trigger', {
    path: `${blobContainer}/{name}`,
    connection: 'AzureWebJobsStorage',
    handler: async (blob, context) => {
        context.log(`Storage blob function processed blob "${context.triggerMetadata.name}" with size ${blob.length} bytes`);
    
        const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
        context.log('fetching container client for container', blobContainer);
        const containerClient = blobServiceClient.getContainerClient(blobContainer);
        context.log('fetched container', containerClient.containerName);
        const blockBlobClient = containerClient.getBlockBlobClient(context.triggerMetadata.name);
        const blobExists = await blockBlobClient.exists();
        if (!blobExists) {
            throw new Error("Cannot download content - Reason: Blob does not exist")
        }
        context.log("Fetched blob");
        const blobContentBuffer = await blockBlobClient.downloadToBuffer(0);
        var rows = blobContentBuffer.toString().split("\n");
        rows.shift(); //remove headers
        rows = rows.map(row => [row.split(",")[1], row.split(",")[2]]).filter(row => row[0] != null && row[1] != null);
        const query = "INSERT INTO user_data (name, last_update) VALUES %L";
        
        insert(query, rows);
    }
});
