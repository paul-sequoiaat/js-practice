require('dotenv').config();
const { QueueServiceClient } = require('@azure/storage-queue');

const connectionString = process.env.CONNECTION_STRING;
const queue = process.env.QUEUE;


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

const pushMessageToQueue = async(stringMessage) => {
    const message = jsonToBase64(stringMessage);
    const queueClient = await getQueueClient();
    await queueClient.sendMessage(message);
    console.log('Message Sent');
}

const receiveMessageFromQueue = async() => {
    const queueClient = await getQueueClient();
    const response = await queueClient.receiveMessages();
    if (response.receivedMessageItems.length === 0) console.log('No messages in queue');
    else {
        const receivedMessageItem = response.receivedMessageItems[0];
        const encodedMessage = receivedMessageItem.messageText;
        const message = encodeBase64ToJson(encodedMessage);
        console.log('MESSAGE  => ', message);
        await queueClient.deleteMessage(receivedMessageItem.messageId, receivedMessageItem.popReceipt);
        console.log('deleted message from queue ', receivedMessageItem.messageId);
    }
}

const jsonToBase64 = (jsonObj) => {
    const jsonString = JSON.stringify(jsonObj);
    return Buffer.from(jsonString).toString('base64');
}

function encodeBase64ToJson(base64String) {
    const jsonString = Buffer.from(base64String,'base64').toString();
    return JSON.parse(jsonString);
}

const clearQueue = async() => {
    const queueClient = await getQueueClient();
    await queueClient.clearMessages();
    console.log('Queue Cleared');
}



const message = {
    id: 1,
    name: "Paul"
}

// pushMessageToQueue(message);

// receiveMessageFromQueue();

// clearQueue();