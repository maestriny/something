export type Todo = {
  id: string;
  text: string;
  done: boolean;
  createdAt: string;
  dueDate?: string;
  categoryId?: string;
  order: number;
};
