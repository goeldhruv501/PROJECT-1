exports.ValidName = (name) => {
    const fnameRegex = /^([a-z A-Z])+$/; 
    return fnameRegex.test(name); 
}

exports.Validemail = (email) => {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; 
    return emailRegex.test(email); 
}

exports.ValidPassword = (password) => {
    const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/; 
    return passwordRegex.test(password); 
}
