import React from "react";
import { FaEye } from "react-icons/fa";

const ViewNotesModal = ({ data }) => {
  return (
    <>
      <div
        className="modal fade"
        id="ViewNotes"
        tabIndex="-1"
        aria-labelledby="ViewNotes"
        aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="ViewNotes">
                Title: {data?.title}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <p>{data?.content}</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewNotesModal;
