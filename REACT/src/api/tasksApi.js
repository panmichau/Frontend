const LOCAL_STORAGE_KEY = 'tasks_api_mock';

const delay = (ms) => new Promise(res => setTimeout(res, ms));

export const tasksApi = {
    
  fetchTasks: async () => {
    await delay(1000); 
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveTasks: async (tasks) => {
    await delay(500); 
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
    return true;
  }
};
