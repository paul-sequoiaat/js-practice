const fs = require('fs').promises;

let jsonData;

const fetchData = async(url) => {
    let content = await fs.readFile(url, 'utf-8');
    let jsonContent = JSON.parse(content);
    return jsonContent;
}

const findAvgSalaryForJobTitle = (data) => {
    let result = [];
    let titleSet = new Set();
    data.forEach((json) => {
        titleSet.add(json.job_title)
    });

    titleSet.forEach(jobTitle => {
        let filteredData = data.filter(json => json.job_title == jobTitle);
        let totalSalary = filteredData
            .map(data => data.salary)
            .reduce((prev, curr) => prev + curr, 0);
        let avgSalary = {
            job_title: jobTitle,
            averageSalary: totalSalary/filteredData.length 
        };
        result.push(avgSalary);
    });

    console.log(result);
}

const processData = async() => {
    const data = await fetchData('./js-practice/json/MOCK_DATA.json');
    const avgSalary = findAvgSalaryForJobTitle(data);
}

processData();

