import React, { useState, useEffect } from "react";
import axios from "axios";
import Toast from "../hooks/Toast";
import Swal from "sweetalert2";

const EditNotesModal = ({ data, handleGetNotes }) => {
  const [newTitle, setNewTitle] = useState(data?.title || "");
  const [newContent, setNewContent] = useState(data?.content || "");
  const toast = Toast();
  useEffect(() => {
    setNewTitle(data?.title || "");
    setNewContent(data?.content || "");
  }, [data]);

  const handleForm = async (e) => {
    e.preventDefault();
    if (!newTitle || !newContent) {
      Swal.fire({
        text: "Title and Content can't be empty",
        icon: "warning",
      });
      return;
    }
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/api/updatenotes`,
      {
        title: newTitle,
        content: newContent,
        id: data?._id,
      },
      {
        withCredentials: true,
      }
    );
    if (response.data.isSuccess) {
      toast.fire({
        icon: "success",
        title: response.data.message,
      });
      handleGetNotes();
    }
  };
  return (
    <>
      <div
        className="modal fade"
        id="EditNotes"
        tabIndex="-1"
        aria-labelledby="EditNotes"
        aria-hidden="true">
        <form onSubmit={handleForm}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="EditNotes">
                  Edit Notes: {data?.title}
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
                    onChange={(e) => setNewTitle(e.target.value)}
                    value={newTitle}
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
                    onChange={(e) => setNewContent(e.target.value)}
                    value={newContent}></textarea>
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
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditNotesModal;
