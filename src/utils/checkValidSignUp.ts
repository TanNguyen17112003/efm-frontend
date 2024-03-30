export const checkValidEmail = (email: string) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailPattern.test(email);
}

export const checkPairPassword = (password: string, confirmPassword: string) => {
    return password === confirmPassword;
}