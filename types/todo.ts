export type Todo = {
  id: string;
  text: string;
  done: boolean;
  created_at: string;
  due_date: string | null;
  category_id: string | null;
  order: number;
  updated_at: string;
};
