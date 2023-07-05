import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

declare var require: any
const SecureStorage = require('secure-web-storage');
const SECRET_KEY = 'LibertadTeam';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  public secureStorage = new SecureStorage(localStorage, {
    hash: function hash(key) {
      key = CryptoJS.SHA256(key, SECRET_KEY);
      return key.toString();
    },
    encrypt: function encrypt(data) {
      // data = CryptoJS.AES.encrypt(data, SECRET_KEY);
      data = CryptoJS.AES.encrypt(JSON.stringify({ data }), SECRET_KEY).toString();
      return data;
    },
    decrypt: function decrypt(data) {
      data = CryptoJS.AES.decrypt(data, SECRET_KEY).toString(CryptoJS.enc.Utf8);
      return data;
    }
  });

  public get userLogged(): any{
    return this.get('userLogged')?.data;
  }

  public get userLoggedJSON() : any{
    return JSON.parse(this.get('userLogged')?.data);
  }

  set(key: string, value: any) {
    this.secureStorage.setItem(key, value);
  }

  get(key: string) {
    return this.secureStorage.getItem(key);
  }

  clear() {
    return this.secureStorage.clear();
  }
}
