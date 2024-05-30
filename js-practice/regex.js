const emailRegex = /^(?=.*@)(?=.*\..{1,}).{5,}$/;

const validateEmail = (value) => {
    try {
        let val = emailRegex.exec(value)
        val !== null ? console.log('Valid') : console.log('Invalid');
    } catch (error) {
        console.log(`ERROR ${error}`);
    }
    
}

validateEmail('a@b.com')
validateEmail('bob.com')