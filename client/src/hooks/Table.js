import React, { useState } from "react";

const Table = (data, search) => {
  const itemPerPage = 10;
  const totalPages = Math.ceil(data.length / itemPerPage);
  const [currentPage, setCurrentPage] = useState(1);
  const itemLastIndex = currentPage * itemPerPage;
  const itemFirstIndex = itemLastIndex - itemPerPage;
  const filteredData = data.filter(
    (data) =>
      data.title.toLowerCase().includes(search.toLowerCase()) ||
      data.date_created.toLowerCase().includes(search.toLowerCase())
  );
  const tableData = filteredData.slice(itemFirstIndex, itemLastIndex);

  const [currentDataView, setCurrentData] = useState();
  const handleCurrentNotesView = (data) => {
    setCurrentData(data);
  };

  const changePage = (page) => {
    setCurrentPage(page);
  };

  const previousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  return {
    tableData,
    totalPages,
    changePage,
    previousPage,
    nextPage,
    currentDataView,
    currentPage,
    handleCurrentNotesView,
  };
};

export default Table;
