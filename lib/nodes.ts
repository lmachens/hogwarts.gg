import type { Database } from './database.types';
import supabase from './supabase-browser';

export const getNodes = async (): Promise<Node[]> => {
  const { data: nodes, error } = await supabase.from('nodes').select();

  if (error) {
    throw error;
  }

  if (!nodes) {
    return [];
  }
  return nodes;
};

export type Node = Database['public']['Tables']['nodes']['Row'];
