import { useEffect, useState } from "react";
import { deletePost, getTodoList, createPost, createUser } from "../js/services/apiServices";

const TodoList = () => {
  const [username, setUsername] = useState("");
  const [confirmedUser, setConfirmedUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchUserTasks = async (name) => {
    try {
      const listTask = await getTodoList(name);
      console.log("TAREAS RECIBIDAS:", listTask); 
  

      if (Array.isArray(listTask)) {
        setTasks(listTask);
      } else if (Array.isArray(listTask?.todos)) {

        setTasks(listTask.todos);
      } else {
        setTasks([]);
      }
    } catch (error) {
      console.error("Error cargando tareas:", error);
      setTasks([]);
    }
  };
  

  const handleUserConfirm = async () => {
    if (!username.trim()) return;
    setLoading(true);
    await fetchUserTasks(username);
    setConfirmedUser(username);
    setLoading(false);
  };

  const addTask = async () => {
    if (newTask.trim() === "") return;

    const body = {
      label: newTask,
      is_done: false,
    };

    try {
      await createPost(confirmedUser, body);
      setNewTask("");
      const updatedTasks = await getTodoList(confirmedUser);
      setTasks(Array.isArray(updatedTasks) ? updatedTasks : []);
    } catch (err) {
      console.error("Error al agregar la tarea:", err);
    }
  };

  const removeTask = async (taskId) => {
    try {
      await deletePost(taskId); 
      const updatedTasks = await getTodoList(confirmedUser);
      setTasks(updatedTasks);
    } catch (err) {
      console.error("Error al eliminar la tarea:", err);
    }
  };
  
  

  if (!confirmedUser) {
    return (
      <div className="max-w-md mx-auto mt-10 p-4 border rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Ingresa tu usuario</h2>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleUserConfirm()}
          placeholder="Nombre de usuario"
          className="border p-2 rounded w-full mb-2"
        />
        <button onClick={handleUserConfirm} className="bg-blue-500 text-white px-4 py-2 rounded w-full">
          Buscar o crear usuario
        </button>
        {loading && <p className="mt-2 text-gray-600">Cargando...</p>}
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Hola, {confirmedUser}</h2>

      <div className="flex flex-col gap-2 mb-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
          placeholder="Nueva tarea"
          className="border p-2 rounded w-full"
        />
        <button onClick={addTask} className="bg-green-500 text-white px-4 py-2 rounded">
          Agregar tarea
        </button>
      </div>

      <ul className="space-y-2">
        {Array.isArray(tasks) && tasks.length > 0 ? (
          tasks.map((task) => (
            <li key={task.id} className="flex justify-between items-center p-2 bg-gray-100 rounded">
              {task.label}
              <button onClick={() => removeTask(task.id)} className="text-red-500">
                ❌
              </button>
            </li>
          ))
        ) : (
          <p className="text-center text-gray-500">No hay tareas aún.</p>
        )}
      </ul>
    </div>
  );
};

export default TodoList;
