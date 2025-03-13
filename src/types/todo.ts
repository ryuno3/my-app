export interface TodoActionState {
  message?: string;
  success?: boolean;
}

export interface TodoItemProps {
  id: string;
  task: string;
}
