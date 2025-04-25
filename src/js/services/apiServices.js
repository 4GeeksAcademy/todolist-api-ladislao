const BASE_URL = "https://playground.4geeks.com/todo";

export const getTodoList = async (username) => {
  const res = await fetch(`${BASE_URL}/users/${username}`);
  const data = await res.json();
  if (!res.ok) throw data;

  return Array.isArray(data.todos) ? data.todos : [];
};


export const createUser = async (username) => {
  const res = await fetch(`${BASE_URL}/users/${username}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify([]),
  });
  return res.json();
};


export const createPost = async (username, task) => {
  try {
    const res = await fetch(`${BASE_URL}/todos/${username}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });

    const data = await res.json();
    if (!res.ok) throw data;

    return data;
  } catch (error) {
    console.error("Error en createPost:", error);
    throw error;
  }
};

export const deletePost = async (taskId) => {
    const res = await fetch(`https://playground.4geeks.com/todo/todos/${taskId}`, {
      method: "DELETE",
    });
  
    if (!res.ok) {
      let errorMsg = "No se pudo eliminar";
      try {
        const data = await res.json();
        errorMsg = data.detail || errorMsg;
      } catch (e) {

      }
      console.error("Error al eliminar tarea:", errorMsg);
      throw new Error(errorMsg);
    }
  };
  

export const getUserList = async () => {
  const res = await fetch(`${BASE_URL}/users`);
  return res.json();
};
