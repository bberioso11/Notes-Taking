import React from "react";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import Swal from "sweetalert2";
import Toast from "../hooks/Toast";

const DeleteNotesModal = ({ title, id, handleGetNotes }) => {
  const toast = Toast();
  const handleDelete = async () => {
    Swal.fire({
      text: `Are you sure you want to delete ${title}?`,
      showCancelButton: true,
      confirmButtonText: "Save",
      icon: "warning",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { data } = await axios.delete(
          `${import.meta.env.VITE_SERVER_URL}/api/deletenotes?id=${id}`
        );
        if (data.isSuccess) {
          toast.fire({
            icon: "success",
            title: data.message,
          });
          handleGetNotes();
        }
      }
    });
  };
  return (
    <>
      <button className="btn btn-outline-primary" onClick={handleDelete}>
        <MdDelete className="action-icon" />
      </button>
    </>
  );
};

export default DeleteNotesModal;
