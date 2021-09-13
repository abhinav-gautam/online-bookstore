import CryptoJS from 'crypto-js';

export const encrypt = plainObject => {
    return CryptoJS.AES.encrypt(JSON.stringify(plainObject), process.env.REACT_APP_SECRET_CRYPTO).toString()
}

export const decrypt = cipherText => {
    return JSON.parse(CryptoJS.AES.decrypt(cipherText, process.env.REACT_APP_SECRET_CRYPTO).toString(CryptoJS.enc.Utf8))
}