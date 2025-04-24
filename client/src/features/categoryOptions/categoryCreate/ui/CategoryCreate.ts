import React from 'react'

export default function CategoryCreate():React.ReactElement {
  return (
    <div>
    <form
    // onSubmit={submitHandler}
    style={{ display: "flex", flexDirection: "column" }}
  >
    <label htmlFor="title">Title</label>
    <input
      type="text"
      name="title"
      placeholder="Enter new title"
      style={{
        marginBottom: "10px",
        marginTop: "5px",
        borderRadius: "8px",
        height: "40px",
        padding: "5px",
      }}
    />
    <label htmlFor="content">Content</label>
    <textarea
      name="content"
      placeholder="Enter new content"
      style={{
        marginBottom: "10px",
        marginTop: "5px",
        borderRadius: "8px",
        height: "80px",
        padding: "5px",
      }}
    ></textarea>
    <label htmlFor="notebookId">Enter notebook id</label>
    <input
      type="number"
      name="notebookId"
      placeholder="Enter new notebookId"
      style={{
        marginBottom: "10px",
        marginTop: "5px",
        borderRadius: "8px",
        width: "50%",
        height: "40px",
        padding: "5px",
      }}
    />

    <button
      style={{
        marginBottom: "10px",
        marginTop: "5px",
        borderRadius: "8px",
        height: "40px",
        width: "100px",
        background: "black",
        color: "white",
        fontWeight: "bold",
      }}
    >
      Add Note
    </button>
  </form>
    </div>
  )
}
