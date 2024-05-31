const { validateEmail } = require('./regex');

describe('regex tests', () => {
    const validEmail = 'js@mail.com';
    const invalidEmail = '123';

    it('should validate proper emails', () => {
        expect(validateEmail(validEmail)).toBe('Valid');
    });

    it('should invalidate improper emails', () => {
        expect(validateEmail(invalidEmail)).toBe('Invalid');
    });
});