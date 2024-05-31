const emailRegex = /^(?=.*@)(?=.*\..{1,}).{5,}$/;

const validateEmail = (value) => {
    try {
        let val = emailRegex.exec(value)
        console.log(val);
        return val !== null ? 'Valid' : 'Invalid';
    } catch (error) {
        console.log(`ERROR ${error}`);
    }
}

module.exports = { validateEmail }

validateEmail('a@b.com')
validateEmail('bob.com')