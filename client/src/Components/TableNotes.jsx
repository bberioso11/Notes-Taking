import React from "react";
import DeleteNotesModal from "./DeleteNotesModal";
import { FaEye } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
const TableNotes = ({ data, handleGetNotes, handleCurrentNotesView }) => {
  return (
    <tr>
      <td>
        <input type="checkbox" />
      </td>
      <td>{data.title}</td>
      <td>{data.date_created}</td>
      <td className="d-flex gap-2">
        <button
          className="btn btn-outline-primary"
          data-bs-toggle="modal"
          data-bs-target="#ViewNotes"
          onClick={() => handleCurrentNotesView(data)}>
          <FaEye className="action-icon" />
        </button>
        <button
          className="btn btn-outline-primary"
          data-bs-toggle="modal"
          data-bs-target="#EditNotes"
          onClick={() => handleCurrentNotesView(data)}>
          <FaEdit className="action-icon" />
        </button>
        <DeleteNotesModal
          id={data._id}
          title={data.title}
          handleGetNotes={handleGetNotes}
        />
      </td>
    </tr>
  );
};

export default TableNotes;
