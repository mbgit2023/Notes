import { CREATE_NOTE, LOGIN, REGISTER } from './endpoints'

export const login = async (email: String, password: String) => {
  const response = await fetch(LOGIN, {
    method: "POST",
    headers: {
      'Content-Type': "application/json"
    }, 
    body: JSON.stringify({ email: email, password: password})
  })
  const json = await response.json()
  return json 
}

export const register = async (email: String, password: String) => {
  const response = await fetch(REGISTER, {
    method: "POST",
    headers: {
      'Content-Type': "application/json"
    }, 
    body: JSON.stringify({ email: email, password: password})
  })
  const json = await response.json()
  return json 
}


export const getNotes = async (userId: Number) => {
    const response = await fetch(`http://localhost:3001/notes/${userId}`)
    const json = await response.json();
    return json
}

export const getNoteById = async (id: Number) => {
  const response = await fetch(`http://localhost:3001/note/${id}`)
  const json = await response.json();
  return json
}


export const createNote = async (
    title: String, content: String, createdAt: String, userId: Number
  ) => {
    const response = await fetch(CREATE_NOTE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
  
      body: JSON.stringify({ title: title, content: content, createdAt: createdAt, userId: userId }),
    });
    const json = await response.json();
    return json;
  }


  export const updateNote = async (
    id: Number, title: String, content: String, updatedAt: String
  ) => {
    const response = await fetch(`http://localhost:3001/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: title, content: content, updatedAt: updatedAt }),
    });
    const json = await response.json();
    return json;
  }

  export const deleteNote = async (
    id: number
  ) => {
    const data = {
      id: Number
    };
    const response = await fetch(`http://localhost:3001/delete/${id}`, {
      method: "DELETE",
    });
    const json = await response.json();
    return json;
  }





  