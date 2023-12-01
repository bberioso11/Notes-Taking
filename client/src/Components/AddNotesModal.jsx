import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Toast from "../hooks/Toast";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const AddNotesModal = ({ handleGetNotes }) => {
  const user = useSelector((state) => state.userData.isLoggedIn);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const toast = Toast();

  const handleForm = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      Swal.fire({
        text: "Title and Content can't be empty",
        icon: "warning",
      });
      return;
    }
    const { data } = await axios.put(
      `${import.meta.env.VITE_SERVER_URL}/api/addnotes`,
      {
        title,
        content,
      },
      {
        withCredentials: true,
      }
    );
    if (data.isSuccess) {
      toast.fire({
        icon: "success",
        title: data.message,
      });
      setTitle("");
      setContent("");
      handleGetNotes();
    }
  };
  return (
    <>
      {user ? (
        <button
          type="button"
          className="btn btn-outline-primary"
          data-bs-toggle="modal"
          data-bs-target="#AddNote">
          Add Note
        </button>
      ) : (
        <Link to="/login" className="btn btn-outline-primary">
          Add Note
        </Link>
      )}
      <div
        className="modal fade"
        id="AddNote"
        tabIndex="-1"
        aria-labelledby="AddNote"
        aria-hidden="true">
        <form onSubmit={handleForm}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="AddNote">
                  Add Notes
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="content" className="form-label">
                    Content
                  </label>
                  <textarea
                    className="form-control"
                    id="content"
                    rows="3"
                    onChange={(e) => setContent(e.target.value)}
                    value={content}></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal">
                  Close
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  data-bs-dismiss="modal">
                  Add Notes
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddNotesModal;
