import { v4 as uuidv4 } from 'uuid';
class Category {
  uuid?: string;
  name: string;
  description: string;
  created_ate: Date;

  constructor() {
    if (!this.uuid) {
      this.uuid = uuidv4();
    }
  }
}

export { Category };
