import CryptoJS from 'crypto-js';

export const encrypt = plainObject => {
    if (plainObject) {
        return CryptoJS.AES.encrypt(JSON.stringify(plainObject), process.env.REACT_APP_SECRET_CRYPTO).toString()
    }
    return
}

export const decrypt = cipherText => {
    if (cipherText) {
        return JSON.parse(CryptoJS.AES.decrypt(cipherText, process.env.REACT_APP_SECRET_CRYPTO).toString(CryptoJS.enc.Utf8))
    }
    return
}