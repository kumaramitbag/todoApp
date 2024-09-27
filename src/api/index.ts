import axios from 'axios';

const API_URL = 'https://dummyjson.com/todos';

export const fetchTodos = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.todos;
  } catch (error) {
    return error;
  }
};

export const addTodoApi = async (text: string) => {
  try {
    const response = await axios.post(API_URL + '/add', {
      todo: text,
      completed: false,
      userId: Math.floor(Math.random() * 9999 + 1),
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

export const deleteTodoApi = async (id: number) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const toggleTodoApi = async (id: number, completed: boolean) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, {
      completed,
    });
    return response.data;
  } catch (error) {
    return error;
  }
};
