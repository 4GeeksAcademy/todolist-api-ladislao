const baseUrlUsers = "https://playground.4geeks.com/todo/users/";

const baseUrlTodo = "https://playground.4geeks.com/todo/";


export const createUser = async () => {
    try {
        const request = await fetch(`${baseUrlUsers}IsNoobDoog`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({})
        });
        const response = await request.json();
        return response;
    } catch (error) {
        console.error("Error en createUser:", error);
        throw new Error(error);
    }
};

export const getTodoList = async () => {
    try {
        const request = await fetch(`${baseUrlUsers}IsNoobDoog`)
        const response = await request.json();
        console.log(response);

        return response.todos;


    }
    catch (error) {
        console.log();

    }
};

export const createPost = async (post) => {
    try {
        const request = await fetch(`${baseUrlTodo}/post/IsNoobDoog`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(post)
        });
        const response = await request.json();
        return response;
    } catch (error) {
        console.error("Error en createPost:", error);
    }
};

export const deletePost = async (postId) => {
    try {
        const request = await fetch(`${baseUrlTodo}/todos/${postId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const response = await request.json();
        return response;
    } catch (error) {
        console.error("Error en deletePost:", error);
    }
};

export const refreshPost = async (postId, updatedPost) => {
    try {
        const request = await fetch(`${baseUrlTodo}/todos/${postId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedPost)
        });
        const response = await request.json();
        return response;
    } catch (error) {
        console.error("Error en refreshPost:", error);
    }
};
