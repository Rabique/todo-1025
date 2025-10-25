
export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export enum FilterStatus {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed'
}
