const { findAdmin, findOutOfStockIndex, filterPassedStudents } = require('./arrays')

describe('array functions tests', () => {

    test('find function failure test', () => {
        const users = [
            { id: 1, name: 'Alice', role: 'user' },
            { id: 2, name: 'Harry', role: 'user' },
        ]
        expect(findAdmin(users))
            .toBeUndefined
    })

    test('find function success test', () => {
        const users = [
            { id: 1, name: 'Larry', role: 'user' },
            { id: 2, name: 'George', role: 'admin' },
        ]

        const res = findAdmin(users);

        expect(res).toBeDefined();
        expect(res.name).toBe('George');
    });

    test('find index success test', () => {
        const products = [
            { id: 1, name: 'Laptop', stock: 4 },
            { id: 2, name: 'Tablet', stock: 10 },
            { id: 3, name: 'Phone', stock: 0 },
        ];

        const res = findOutOfStockIndex(products);

        expect(res).toBe(2);
    });

    test('find index failure test', () => {
        const products = [
            { id: 1, name: 'Laptop', stock: 4 },
            { id: 2, name: 'Tablet', stock: 10 },
            { id: 3, name: 'Phone', stock: 5 },
        ];

        const res = findOutOfStockIndex(products);
        
        expect(res).toBe(-1);
    });

    test('filter success test', () => {
        const students = [
            { id: 1, name: 'Alice', score: 85 },
            { id: 2, name: 'Bob', score: 58 },
            { id: 3, name: 'Charlie', score: 95 },
            { id: 4, name: 'Dave', score: 45 },
        ];

        const res = filterPassedStudents(students);

        expect(res).toBeDefined();
        expect(res.length).toBe(2);
        res.forEach(student => {
            expect(student.score).toBeGreaterThanOrEqual(60);
        });
    });

    test('filter failure test', () => {
        const students = [
            { id: 1, name: 'Alice', score: 0 },
            { id: 2, name: 'Bob', score: 0 },
            { id: 3, name: 'Charlie', score: 0 },
            { id: 4, name: 'Dave', score: 0 },
        ];

        const res = filterPassedStudents(students);

        expect(res).toBeDefined();
        expect(res.length).toEqual(0)
    });
});