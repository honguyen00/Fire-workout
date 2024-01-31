//custom password regex
export const passwordValidator = async (_, value) => {
    const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
    if (value && value.match(pattern)) {
        return Promise.resolve();
    }

    return Promise.reject(new Error('Please enter a valid password!'))
}
//custom email regex
export const emailValidator = async (_, value) => {
    const pattern = /.+@[^@]+\.[^@]{2,}$/
    if (value && value.match(pattern)) {
        return Promise.resolve();
    }

    return Promise.reject(new Error('Please enter a valid email!'))
}
