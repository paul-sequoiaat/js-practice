const { calculateAge } = require('./dates');

test('should return accurate age', () => {
    const currentYear = new Date().getFullYear();
    expect(calculateAge(new Date("1970-01-01"))).toBe(`${currentYear - 1970} years`);
})