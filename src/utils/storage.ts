import { AES, enc } from 'react-native-crypto-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const REACT_APP_SECRET_KEY = `1234123412341234`;

export class Storage {
  private static encrypt(data: string) {
    let encrypted = AES.encrypt(data, REACT_APP_SECRET_KEY);

    return encrypted.toString();
  }

  private static decrypt(data: string): string {
    let decrypted = AES.decrypt(data, REACT_APP_SECRET_KEY);

    return decrypted.toString(enc.Utf8);
  }

  public static async setItem(key: string, data: any): Promise<void> {
    const _toStringify = JSON.stringify(data);
    let _encrypted = this.encrypt(_toStringify);
    try {
      await AsyncStorage.setItem(key, _encrypted)
    } catch (e) {
      // saving error
      console.error(e);
    }
  }

  public static async removeItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      throw e;
    }
  }

  public static async getItem<T = any>(key: string): Promise<T | null> {
    let _fromStorage = await AsyncStorage.getItem(key);

    if (_fromStorage != null) {
      const _descrypted = this.decrypt(_fromStorage);
      try {
        return JSON.parse(_descrypted);
      } catch {
        return _descrypted as unknown as T;
      }
    }

    return _fromStorage;
  }

}
