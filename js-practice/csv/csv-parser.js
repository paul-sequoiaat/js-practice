const csv = require('csv-parser');
const fs = require('fs');
var path = require('path');
const results = [];
const csvPath = path.join("resources", "MOCK_DATA.csv");
const ipAddress = "94.68.191.243";
var email;

const fetchData = () => {
    return fs.createReadStream(csvPath, 'utf-8');
}

const parseCsv = async() => {
    return new Promise((resolve, reject) => {
        const stream = fetchData(csvPath);
        stream.pipe(csv())
            .on('data', (data) => results.push(data))
            .on('error', (error) => reject(error))
            .on('end', () => resolve(results));
    });
}

const getEmailByIpAddress = async(ipAddress) => {
    await parseCsv();
    const data = results.find(result => result.ip_address === ipAddress);
    if (data != null) {
        console.log(data.email);
        return data.email;
    } else {
        console.log("Invalid IP address");
    }
}

getEmailByIpAddress(ipAddress);