import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb';

@Injectable({ providedIn: 'root' })
export class DatabaseService {
  private db: any;

  constructor() {
    this.db = new PouchDB('aem_local_db');
    this.seed();
  }

  // seed a default user on first run
  private async seed() {
    try {
      await this.db.put({
        _id: 'user@aemenersol.com',
        password: 'Test@123',
        name: 'Test User'
      });
    } catch (err: any) {
      // 409 = doc already exists, ignore
      if (err.status !== 409) {
        console.error('DB seed error', err);
      }
    }
  }

  async validateUser(email: string, pass: string): Promise<boolean> {
    try {
      const user = await this.db.get(email);
      return user.password === pass;
    } catch {
      return false;
    }
  }
}
