import CryptoJS from "crypto-js";

export default class CommonUtil {
  private secretKey: string;

  constructor() {
    this.secretKey = process.env.SECRET_KEY || "";

    if (!this.secretKey) {
      throw new Error("Please provide SECRET_KEY environment variable");
    }
  }

  /**
   * Encrypts data using AES encryption with the secret key
   * @param data - Plain text to encrypt
   * @returns - Encrypted string
   */
  public encryptData(data: string): string {
    const encryptedData = CryptoJS.AES.encrypt(data, this.secretKey).toString();
    return encryptedData;
  }

  /**
   * Decrypts data using AES decryption with the secret key
   * @param encryptedData - Encrypted string to decrypt
   * @returns - Decrypted plain text
   */
  public decryptData(encryptedData: string): string {
    const decryptedData = CryptoJS.AES.decrypt(
      encryptedData,
      this.secretKey
    ).toString(CryptoJS.enc.Utf8);
    return decryptedData;
  }
}


















































// import cryptojs from "crypto-js";




// export default class CommonUtil {
//   private secretKey: string;

//   constructor() {
//     //this.secretKey = process.env.SECRET_KEY ? process.env.SECRET_KEY : "";
//     if (process.env.SECRET_KEY) {
//       this.secretKey = process.env.SECRET_KEY;
//     } else {
//       throw new Error("please provide a secret key while starting the test");
//     }
//   }

//   /**
//    * provide encrypted data using AES encryption algorithm, the secret key is provided through environment variable while starting the test
//    * @param data
//    * @returns
//    */
//   public encryptData(data: string) {
//     const encryptedData = cryptojs.AES.encrypt(data, this.secretKey).toString();
//     console.log(encryptedData);
//     return encryptedData;
//   }
//   /**
//    * it will decrypt the encrypted data using AES decryption algorithm, the secret key is provided through environment variable while starting the test
//    * @param encdata
//    * @returns
//    */
//   public decryptData(encdata: string) {
//     const decryptedData = cryptojs.AES.decrypt(
//       encdata,
//       this.secretKey,
//     ).toString(cryptojs.enc.Utf8);
//     console.log(decryptedData);
//     return decryptedData;
//   }
// }
