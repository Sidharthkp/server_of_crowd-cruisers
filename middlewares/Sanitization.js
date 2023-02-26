const { check } = require('express-validator');

// Validation rules.
// var loginValidate = [
//     check('username', 'Username Must Be an Email Address').isEmail(),
//     check('password').isLength({ min: 8 })
//         .withMessage('Password Must Be at Least 8 Characters')
//         .matches('[0-9]').withMessage('Password Must Contain a Number')
//         .matches('[A-Z]').withMessage('Password Must Contain an Uppercase Letter')];

let emailSanitizer = [
    check('email', 'Must Be an Email Address').isEmail().trim().escape().normalizeEmail()
]


module.exports = {
    // loginValidate
    emailSanitizer,
}