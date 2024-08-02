const csv = require('csv-parser');
const fs = require('fs');
var path = require('path');

const fetchData = (path) => {
    return fs.createReadStream(path, 'utf-8');
}

const parseCsv = async(path) => {
    const results = [];
    return new Promise((resolve, reject) => {
        const stream = fetchData(path);
        stream.pipe(csv())
            .on('data', (data) => results.push(data))
            .on('error', (error) => reject(error))
            .on('end', () => resolve(results));
    });
}

const getEmailByIpAddress = async(ipAddress) => {
    const csvPath = path.join("resources", "MOCK_DATA.csv");
    await parseCsv(csvPath);
    const data = results.find(result => result.ip_address === ipAddress);
    if (data != null) {
        console.log(data.email);
        return data.email;
    } else {
        console.log("Invalid IP address");
    }
}

module.exports = { parseCsv };
