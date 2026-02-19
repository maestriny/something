import { supabase } from './supabase';
import type { Todo } from '@/types/todo';
import type { Category } from '@/types/category';

// pull all rows for the authenticated user
export async function pullTodos(): Promise<Todo[]> {
  const { data, error } = await supabase.from('todos').select('*');
  if (error) throw error;
  return (data ?? []) as Todo[];
}

export async function pullCategories(): Promise<Category[]> {
  const { data, error } = await supabase.from('categories').select('*');
  if (error) throw error;
  return (data ?? []) as Category[];
}

// upsert local rows to remote
export async function pushTodos(todos: Todo[], userId: string): Promise<void> {
  if (todos.length === 0) return;
  const rows = todos.map(t => ({ ...t, user_id: userId }));
  const { error } = await supabase.from('todos').upsert(rows, { onConflict: 'id,user_id' });
  if (error) throw error;
}

export async function pushCategories(categories: Category[], userId: string): Promise<void> {
  if (categories.length === 0) return;
  const rows = categories.map(c => ({ ...c, user_id: userId }));
  const { error } = await supabase.from('categories').upsert(rows, { onConflict: 'id,user_id' });
  if (error) throw error;
}

// hard delete rows by id
export async function deleteTodos(ids: string[]): Promise<void> {
  if (ids.length === 0) return;
  const { error } = await supabase.from('todos').delete().in('id', ids);
  if (error) throw error;
}

export async function deleteCategories(ids: string[]): Promise<void> {
  if (ids.length === 0) return;
  const { error } = await supabase.from('categories').delete().in('id', ids);
  if (error) throw error;
}
