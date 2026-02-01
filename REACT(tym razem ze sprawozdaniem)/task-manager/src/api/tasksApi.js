export const fetchTasks = () => {
  return new Promise((resolve) => {
    const saved = localStorage.getItem("myTasks");
    const data = saved ? JSON.parse(saved) : [];
    setTimeout(() => resolve(data), 1000);
  });
};

export const saveTasks = (tasks, signal) => {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      localStorage.setItem("myTasks", JSON.stringify(tasks));
      resolve({ success: true });
    }, 800);

    signal?.addEventListener('abort', () => {
      clearTimeout(timeoutId);
      reject(new DOMException('Aborted', 'AbortError'));
    });
  });
};