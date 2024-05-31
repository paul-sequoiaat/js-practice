//find function

const users = [
    { id: 1, name: 'Alice', role: 'user' },
    { id: 2, name: 'Bob', role: 'admin' },
    { id: 3, name: 'Charlie', role: 'user' },
];

const findAdmin = (users) => {
    return users.find(user => user.role === 'admin');
};

console.log(findAdmin(users));



//findIndex function

const products = [
    { id: 1, name: 'Laptop', stock: 4 },
    { id: 2, name: 'Phone', stock: 0 },
    { id: 3, name: 'Tablet', stock: 10 },
];

const findOutOfStockIndex = (products) => {
    return products.findIndex(product => product.stock === 0);
};

console.log(findOutOfStockIndex(products));



//filter function

const students = [
    { id: 1, name: 'Alice', score: 85 },
    { id: 2, name: 'Bob', score: 58 },
    { id: 3, name: 'Charlie', score: 95 },
    { id: 4, name: 'Dave', score: 45 },
];

const filterPassedStudents = (students) => {
    return students.filter(student => student.score >= 60);
};

console.log(filterPassedStudents(students));



//map function

const productsArray = [
    { id: 1, name: 'Laptop', price: 1000 },
    { id: 2, name: 'Phone', price: 500 },
    { id: 3, name: 'Tablet', price: 700 },
];

const applyDiscount = (products, discount) => {
    return products.map(product => ({
        name: product.name,
        discountedPrice: product.price * (1 - discount)
    }));
};

console.log(applyDiscount(productsArray, 0.10));



//push function

let tasks = ['Do laundry', 'Clean room'];

const addTasks = (tasks, newTasks) => {
    newTasks.forEach(task => tasks.push(task));
    return tasks;
};

console.log(addTasks(tasks, ['Buy groceries', 'Pay bills'])); 



//sort function

const employees = [
    { name: 'Alice', salary: 50000 },
    { name: 'Bob', salary: 70000 },
    { name: 'Charlie', salary: 60000 },
];

const sortEmployeesBySalary = (employees) => {
    return employees.sort((a, b) => b.salary - a.salary);
};

console.log(sortEmployeesBySalary(employees));



//splice function

let items = ['item1', 'item2', 'item3', 'item4'];

const modifyItems = (items, start, deleteCount, ...newItems) => {
    items.splice(start, deleteCount, ...newItems);
    return items;
};

console.log(modifyItems(items, 0, 2, 'newItem1', 'newItem2')); 


module.exports = { findAdmin, findOutOfStockIndex, filterPassedStudents };