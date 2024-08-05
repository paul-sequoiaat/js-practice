const { app } = require('@azure/functions');
require('dotenv').config();
const { processMessageAndSaveToDB } = require('../../utils/azurite-utils');

const queue = process.env.queue;

app.storageQueue('storage-queue-trigger', {
    queueName: `${queue}`,
    connection: 'AzureWebJobsStorage',
    handler: (queueItem, context) => {
        context.log('Message size', queueItem.length);
        processMessageAndSaveToDB(queueItem)
            .then(() => context.log('Queue message processed successfully'))
            .catch((err) => context.log(`ERROR => ${err}`));
    }
});
