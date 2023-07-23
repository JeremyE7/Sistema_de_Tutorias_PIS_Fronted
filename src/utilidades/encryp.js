import CryptoJS from 'crypto-js';

const secretKey = 'l5|}p%Yer_2kg[VA7:]qBO1N;PJ2m|{f';

export const encriptando = (data) => {
    const encrypt = CryptoJS.AES.encrypt(
      JSON.stringify(data),
      secretKey,
    ).toString()

    return encrypt;
  }

export const desencriptando = (nombre) => {
    const encrypt = localStorage.getItem(nombre);
   
    const decrypt = CryptoJS.AES.decrypt(encrypt, secretKey).toString(
      CryptoJS.enc.Utf8,
    )
    
    const decrypt2 = decrypt.replace(',',' ').replace('[','').replace(']','').replace('"','').replace('"','').replace('"','').replace('"','');

    return decrypt2;
  }