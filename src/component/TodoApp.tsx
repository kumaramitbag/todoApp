import React, { useState, useEffect } from 'react';
import AddTodo from './AddTodo';
import TodoList from './TodoList';
import Filter from './Filter';
import { fetchTodos, addTodoApi, deleteTodoApi, toggleTodoApi } from '../api/';
import { Backdrop, CircularProgress } from '@mui/material';

export interface Todo {
  id: number;
  todo: string;
  completed: boolean;
}

const TodoApp: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const localStoreData: any = localStorage.getItem('filter');
  const [loading, setLoading] = useState<boolean>(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending'>(localStoreData ? localStoreData : 'all');

  // Fetch tasks from the API and save them in local state
  useEffect(() => {
    const loadTodos = async () => {
      try {
        setLoading(true);
        const todosFromApi = await fetchTodos();
        setTodos(todosFromApi);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log('fetching error = ', error);
      }
    };
    loadTodos();
  }, []);

  // Add a new task
  const addTodo = async (text: string) => {
    try {
      setLoading(true);
      const newTodo = await addTodoApi(text);
      setTodos([newTodo, ...todos]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('add error = ', error);
    }
  };

  // Toggle task completion
  const toggleTodo = async (id: number) => {
    setLoading(true);
    const updatedTodo = todos.find((todo) => todo.id === id);
    if (updatedTodo) {
      const newStatus = !updatedTodo.completed;
      try {
        await toggleTodoApi(id, newStatus);
        setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: newStatus } : todo)));
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log('update error = ', error);
      }
    }
  };

  // Delete task
  const deleteTodo = async (id: number) => {
    try {
      setLoading(true);
      await deleteTodoApi(id);
      setTodos(todos.filter((todo) => todo.id !== id));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('delete error = ', error);
    }
  };

  // Filter todos based on the filter state
  const filteredTodos = todos.filter((todo) => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'pending') return !todo.completed;
    return true;
  });

  return (
    <div className="todo-app">
      <Backdrop sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <h1>To-Do List</h1>
      <AddTodo addTodo={addTodo} />
      <Filter setFilter={setFilter} />
      <TodoList todos={filteredTodos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
    </div>
  );
};

export default TodoApp;
