import React, { useState, useEffect } from "react";
import "react-h5-audio-player/lib/styles.css";
import axios from "axios";
import Select from 'react-select';
import { API, LoadingSpinner } from "../env";


const MocksIWasChecked = () => {
  const [error, setError] = useState(false);
  const [mocks, setMocks] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [months, setMonth] = useState([
    {value:1, label:"Yanvar"},
    {value:2, label:"Fevral"},
    {value:3, label:"Mart"},
    {value:4, label:"Aprel"},
    {value:5, label:"May"},
    {value:6, label:"Iyun"},
    {value:7, label:"Iyul"},
    {value:8, label:"Avgust"},
    {value:9, label:"Sentyabr"},
    {value:10, label:"Oktyab"},
    {value:11, label:"Noyabr"},
    {value:12, label:"Dekabr"},
  ]);
  const [selectedMonth,setSelectedMonth] = useState(months[new Date().getMonth()]);

  const fetchMocks = async (page, pageSize, sorted) => {
    try {
      const response = await axios.get(
        `${API}/mock/mocks-for-teacher?page=${page}&size=${pageSize}&month=${selectedMonth.value}&checked=true`, {
          headers:{
            'Authorization':`Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      const data = response.data;
      if (data.mocks.length == 0) {
        setError(true);
      }
      setMocks(data.mocks);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchMocks(page, pageSize);
  }, [page, pageSize]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="text-center mt-5">
      <h1 className="text-2xl font-bold mb-4">Mocklar</h1>
      <div className="flex justify-center gap-4 mt-5">
      <Select
            isMulti={false}
            value={selectedMonth}
            onChange={(selectedOption) => setSelectedMonth(selectedOption)}
            options={months}
            className="mt-2 w-40"
            classNamePrefix="select"
          />
      </div>
      
{mocks.length === 0 ? (
  error ? <>Siz mock topshirmagansiz</> :
  <LoadingSpinner />
) : (
  mocks.map((mock) => (
    <>
    <div key={mock.id} className="w-full md:w-96 lg:w-2/3 xl:w-1/2 mx-auto my-4 border-b rounded border p-4 transition-all hover:shadow-lg">
      <div className="text-gray-700 text-left">
      <a href={`/mock-feedback/${mock.id}`} className="text-left font-semibold text-lg mb-2">
        Part 1, {mock.topic1}
      </a>
      <a href={`/mock-feedback/${mock.id}`} className="text-left font-semibold text-lg mb-2">
        Part 2, {mock.topic2}
      </a>
      <a href={`/mock-feedback/${mock.id}`} className="text-left font-semibold text-lg mb-2">
        Part 3, {mock.topic3}
      </a>
      </div>

      <div className="text-right mt-2 flex justify-end items-center">
        <div className="flex space-x-2">
          <a
            href={`/mock-feedback/${mock.id}`}
            className="px-3 py-1 rounded-full bg-blue-500 text-white transition-colors hover:bg-blue-600"
          >
            Full view
          </a>
        </div>
      </div>

    </div>
    <div key={mock.id} className="w-full md:w-96 lg:w-2/3 xl:w-1/2 mx-auto my-4 border-b rounded border p-4 transition-all hover:shadow-lg">
    </div>
    </>
  ))
)}

        <div className="flex justify-center gap-4 mt-5">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page <= 0}
            className="bg-gray-400 text-white px-4 py-2 rounded"
          >
            Oldingi
          </button>
          <span>
            Sahifa {page + 1} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page + 1 >= totalPages}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Keyingi
          </button>
        </div>
    </div>
  );
};

export default MocksIWasChecked;