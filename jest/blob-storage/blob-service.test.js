const { BlobServiceClient } = require('@azure/storage-blob');
const { uploadToBlobStorage, downloadFromBlobStorage, deleteAllBlobsInContainer} = require('../../blob-storage/blob-service');
const { getReadStreamForFile } = require('../../file-service/file-reader');

jest.mock('../../file-service/file-reader');
jest.mock('@azure/storage-blob', () => {
    return {
        BlobServiceClient: {
            fromConnectionString: jest.fn()
        }
    }
});

const mockBlob = process.env.BLOB;
const mockContainer = process.env.BLOB_CONTAINER;
const mockConnectionString = process.env.CONNECTION_STRING;
const mockFilePath = '/test/path';
const mockDownloadFromBlobStorageResult = 'mock data';


describe('blob service tests', () => {
    const origEnv = process.env;
    
    const mockStream = {};

    const mockBuffer = Buffer.from(mockDownloadFromBlobStorageResult);

    const mockBlockBlobClient = {
        uploadStream: jest.fn().mockReturnValue('Blob upload success'),
        exists: jest.fn(),
        downloadToBuffer: jest.fn().mockResolvedValue(mockBuffer)
    }

    const mockBlobItem1 = {
        name: jest.fn()
    }

    const mockBlobItem2 = {
        name: jest.fn()
    }

    const blobItemList = new Array(mockBlobItem1, mockBlobItem2);

    const mockBlobClient = {
        delete: jest.fn().mockResolvedValue()
    }

    const mockContainerClient = {
        exists: jest.fn().mockReturnValue(true),
        create: jest.fn(),
        containerName: jest.fn(),
        getBlockBlobClient: jest.fn().mockReturnValue(mockBlockBlobClient),
        listBlobsFlat: jest.fn().mockImplementation(function* () {
            yield* blobItemList;
        }),
        getBlobClient: jest.fn().mockReturnValue(mockBlobClient)
    };
    
    const mockBlobServiceClient = {
        getContainerClient: jest.fn().mockReturnValue(mockContainerClient)
    };

    Object.defineProperty(mockContainerClient, 'containerName', {
        get: jest.fn(() => mockContainer)
    });

    Object.defineProperty(mockBlobItem1, 'name', {
        get: jest.fn(() => 'blob1')
    });

    Object.defineProperty(mockBlobItem2, 'name', {
        get: jest.fn(() => 'blob2')
    });

    beforeEach(() => {
        getReadStreamForFile.mockReturnValue(mockStream);
        BlobServiceClient.fromConnectionString.mockReturnValue(mockBlobServiceClient);
    });

    afterEach(() => {
        process.env = origEnv;
    });


    it('should upload to blob storage', async () => {
        const result = await uploadToBlobStorage(mockBlob, mockFilePath);

        expect(getReadStreamForFile).toHaveBeenCalledWith(mockFilePath);
        expect(BlobServiceClient.fromConnectionString).toHaveBeenCalledWith(mockConnectionString);
        expect(result).not.toBeUndefined();
    });

    it('should download from blob storage', async () => {
        mockBlockBlobClient.exists.mockResolvedValue(true);

        const result = await downloadFromBlobStorage(mockBlob);

        expect(BlobServiceClient.fromConnectionString).toHaveBeenCalledWith(mockConnectionString);
        expect(result).toBe(mockDownloadFromBlobStorageResult);
    });

    it('should fail to download from blob storage as blob does not exist', async () => {
        mockBlockBlobClient.exists.mockResolvedValue(false);

        await expect(downloadFromBlobStorage(mockBlob)).rejects.toThrow(
            "Cannot download content - Reason: Blob does not exist"
        );
        expect(mockBlockBlobClient.exists).toHaveBeenCalled();
    });

    it('should delete all blobs in the container', async () => {
        await deleteAllBlobsInContainer();

        expect(mockContainerClient.listBlobsFlat).toHaveBeenCalled();
        expect(mockContainerClient.getBlobClient).toHaveBeenCalledWith(mockBlobItem1.name);
        expect(mockContainerClient.getBlobClient).toHaveBeenCalledWith(mockBlobItem2.name);
        expect(mockBlobClient.delete).toHaveBeenCalled();
    });
});
