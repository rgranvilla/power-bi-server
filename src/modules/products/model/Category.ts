import { v4 as uuidV4 } from "uuid";

class Category {
  id?: string;
  title: string;
  parentId?: string;
  parentTitle?: string;
  indentation: number;
  icon: string;
  image: string;
  priority: number;
  slug?: string;
  created_at?: Date;
  created_by?: string;
  updated_at?: Date;
  updated_by?: string;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Category };
