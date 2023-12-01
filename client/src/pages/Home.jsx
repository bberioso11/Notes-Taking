import React, { useState, useEffect } from "react";
import AddNotesModal from "../Components/AddNotesModal";
import axios from "axios";
import ViewNotesModal from "../Components/ViewNotesModal";
import EditNotesModal from "../Components/EditNotesModal";
import TableNotes from "../Components/TableNotes";
import { useSelector } from "react-redux";
import Table from "../hooks/Table";

const Home = () => {
  const [notes, setNotes] = useState([]);
  const user = useSelector((state) => state.userData.value);
  const [search, setSearch] = useState("");

  const {
    tableData,
    totalPages,
    changePage,
    previousPage,
    nextPage,
    currentPage,
    currentDataView,
    handleCurrentNotesView,
  } = Table(notes, search);

  const handleGetNotes = async () => {
    if (user) {
      const { data } = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/getnotes`,
        {
          withCredentials: true,
        }
      );
      setNotes(data);
    }
  };

  useEffect(() => {
    handleGetNotes();
  }, [user]);

  return (
    <div className="container-fluid">
      <div className="row justify-content-center mt-3">
        <div className="col-8">
          <div className="card shadow p-3">
            <div className="d-flex justify-content-between mb-2">
              <div className="">
                <input
                  className="form-control"
                  placeholder="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="">
                <AddNotesModal handleGetNotes={handleGetNotes} />
              </div>
            </div>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">
                      <input type="checkbox" name="" id="" />
                    </th>
                    <th scope="col">Title</th>
                    <th scope="col">Date Added</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((data, key) => (
                    <TableNotes
                      key={key}
                      data={data}
                      handleGetNotes={handleGetNotes}
                      handleCurrentNotesView={handleCurrentNotesView}
                    />
                  ))}
                </tbody>
              </table>
            </div>
            <div className="d-flex justify-content-center">
              <nav aria-label="Page navigation example">
                <ul className="pagination">
                  <li className="page-item">
                    <button
                      className={`page-link text-reset ${
                        currentPage === 1 && `disabled`
                      }`}
                      onClick={previousPage}>
                      Previous
                    </button>
                  </li>
                  {Array.from({ length: totalPages }).map((_, index) => (
                    <li key={index} className="page-item">
                      <button
                        className="page-link text-reset"
                        onClick={() => changePage(index + 1)}>
                        {index + 1}
                      </button>
                    </li>
                  ))}
                  <li className="page-item">
                    <button
                      className={`page-link text-reset ${
                        currentPage === totalPages && `disabled`
                      }`}
                      onClick={nextPage}>
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <ViewNotesModal data={currentDataView} />
      <EditNotesModal data={currentDataView} handleGetNotes={handleGetNotes} />
    </div>
  );
};

export default Home;
