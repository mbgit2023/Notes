import { GETNOTES, CREATE_NOTE } from './endpoints'

export const getNotes = async () => {
    const response = await fetch(GETNOTES)
    const json = await response.json();
    return json
}

export const getNoteById = async (id: Number) => {
  const response = await fetch(`http://localhost:3001/note/${id}`)
  const json = await response.json();
  return json
}


export const createNote = async (
    title: String, content: String, createdAt: String
  ) => {
    const response = await fetch(CREATE_NOTE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
  
      body: JSON.stringify({ title: title, content: content, createdAt: createdAt }),
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



  