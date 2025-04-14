import React, { useState, useRef, useEffect } from "react";

const AddRecord = () => {
  const inputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [tailors, setTailors] = useState([]);
  const [records, setRecords] = useState([]);
  const [selectedRecords, setSelectedRecords] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const storedTailors = localStorage.getItem("workers");
    if (storedTailors) {
      setTailors(JSON.parse(storedTailors));
    }

    const storedRecords = localStorage.getItem("empdata");
    if (storedRecords) {
      setRecords(JSON.parse(storedRecords));
    }
  }, []);

  const getCurrentTimestamp = () => {
    return new Date().toISOString().slice(0, 19).replace("T", " ");
  };

  const [formData, setFormData] = useState({
    date: "",
    tailorName: "",
    workCategory: "",
    styleNumber: "",
    qty: "1",
    timestamp: getCurrentTimestamp(),
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const selectedTailor = tailors.find(
    (tailor) => tailor.name === formData.tailorName
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const updatedData = {
      ...formData,
      workCategory: selectedTailor
        ? selectedTailor.isPieceRate
          ? "Yes"
          : "No"
        : "Is Piece Rate",
      timestamp: getCurrentTimestamp(),
    };

    let updatedRecords;
    if (editIndex !== null) {
      updatedRecords = [...records];
      updatedRecords[editIndex] = updatedData;
    } else {
      updatedRecords = [updatedData,...records];
    }

    setRecords(updatedRecords);
    localStorage.setItem("empdata", JSON.stringify(updatedRecords));

    setLoading(false);
    setFormData((prev) => ({
      ...prev,
      styleNumber: "",
      qty: "1",
      timestamp: getCurrentTimestamp(),
    }));
    setEditIndex(null);
    inputRef.current.focus();
  };

  const handleEdit = (index) => {
    const recordToEdit = records[index];
    setFormData(recordToEdit);
    setEditIndex(index);
    inputRef.current.focus();
  };

  const handleDelete = (index) => {
    const updatedRecords = records.filter((_, i) => i !== index);
    setRecords(updatedRecords);
    localStorage.setItem("empdata", JSON.stringify(updatedRecords));
  };

  const handleBulkDelete = () => {
    const updatedRecords = records.filter(
      (_, i) => !selectedRecords.includes(i)
    );
    setRecords(updatedRecords);
    localStorage.setItem("empdata", JSON.stringify(updatedRecords));
    setSelectedRecords([]);
  };

  const handleCheckboxChange = (index) => {
    setSelectedRecords((prevSelected) =>
      prevSelected.includes(index)
        ? prevSelected.filter((i) => i !== index)
        : [...prevSelected, index]
    );
  };

  const handleSelectAll = (e) => {
    setSelectedRecords(e.target.checked ? filteredRecords.map((_, i) => i) : []);
  };

  const exportToCSV = () => {
    const selectedData = selectedRecords.map((index) => records[index]);
    if (selectedData.length === 0) {
      alert("Please select at least one record to export.");
      return;
    }

    const csvRows = [
      ["Date", "Tailor Name", "Work Category", "Style Number", "Qty", "Timestamp"],
      ...selectedData.map((row) => [
        row.date,
        row.tailorName,
        row.workCategory,
        row.styleNumber,
        row.qty,
        row.timestamp,
      ]),
    ];

    const csvContent =
      "data:text/csv;charset=utf-8," + csvRows.map((e) => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "records.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredRecords = records.filter((record) => {
    if (!startDate || !endDate) return true;
    return record.date >= startDate && record.date <= endDate;
  });

  return (
    <div className="mt-4 container mx-auto py-4 px-2">
      <form onSubmit={handleSubmit}>
        <div className="w-3xl flex justify-evenly gap-10 mx-auto">
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="border border-gray-200 rounded w-full px-4 py-2"
          />
          <input
            list="tailors"
            name="tailorName"
            value={formData.tailorName}
            onChange={handleChange}
            className="border border-gray-200 rounded w-full px-4 py-2"
            placeholder="Select or type Tailor Name"
          />
          <datalist id="tailors">
            {tailors.map((tailor, index) => (
              <option key={index} value={tailor.name} />
            ))}
          </datalist>
          <input
            type="text"
            name="workCategory"
            value={
              selectedTailor
                ? selectedTailor.isPieceRate
                  ? "Yes"
                  : "No"
                : "Is Piece Rate"
            }
            className="border border-gray-200 rounded w-full px-4 py-2"
            disabled
          />
        </div>

        <h1 className="mt-10 font-bold w-3xl mx-auto">Product Details</h1>
        <div className="w-3xl flex justify-evenly gap-10 mx-auto mt-4">
          <input
            type="text"
            name="styleNumber"
            value={formData.styleNumber}
            onChange={handleChange}
            className="px-4 rounded border border-gray-200 w-full py-2 outline-teal-400"
            placeholder="Style Number"
            ref={inputRef}
          />
          <input
            type="number"
            name="qty"
            value={formData.qty}
            onChange={handleChange}
            className="px-4 rounded border border-gray-200 w-full py-2 outline-teal-400"
            placeholder="No of Pieces"
          />
          <button
            type="submit"
            className={`bg-blue-400 px-8 text-white cursor-pointer py-2 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {editIndex !== null ? "Update" : loading ? "Submitting..." : "Submit"}
          </button>
          {editIndex !== null && (
            <button
              type="button"
              onClick={() => {
                setFormData({
                  date: "",
                  tailorName: "",
                  workCategory: "",
                  styleNumber: "",
                  qty: "1",
                  timestamp: getCurrentTimestamp(),
                });
                setEditIndex(null);
              }}
              className="bg-gray-400 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <h2 className="mt-6 font-bold text-lg">Stored Records</h2>

      <div className="flex gap-4 my-4 items-center justify-between">
        <div>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border border-gray-300 p-2 cursor-pointer rounded"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border border-gray-300 p-2 cursor-pointer rounded ml-2"
          />
        </div>
        <div>
          <button
            onClick={handleBulkDelete}
            className="bg-red-500 text-white cursor-pointer px-4 py-2 rounded"
          >
            Delete Selected
          </button>
          <button
            onClick={exportToCSV}
            className="bg-blue-500 text-white cursor-pointer px-4 py-2 rounded ml-2"
          >
            Export to CSV
          </button>
        </div>
      </div>

      <table className="w-full border-collapse mb-20 border text-gray-600 border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2 border-gray-200">
              <input
                type="checkbox"
                onChange={handleSelectAll}
                checked={
                  selectedRecords.length === filteredRecords.length &&
                  filteredRecords.length > 0
                }
              />
            </th>
            <th className="border border-gray-200 p-2">ID</th>
            <th className="border border-gray-200 p-2">Date</th>
            <th className="border border-gray-200 p-2">Tailor Name</th>
            <th className="border border-gray-200 p-2">Style Number</th>
            <th className="border border-gray-200 p-2">Qty</th>
            <th className="border border-gray-200 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredRecords.map((record, index) => (
            <tr
              key={index}
              className="border hover:bg-gray-100 duration-75 text-center ease-in cursor-pointer"
            >
              <td className="border border-gray-200 p-2">
                <input
                  type="checkbox"
                  onChange={() => handleCheckboxChange(index)}
                  checked={selectedRecords.includes(index)}
                />
              </td>
              <td className="border border-gray-200 p-2">{index + 1}</td>
              <td className="border border-gray-200 p-2">{record.date}</td>
              <td className="border border-gray-200 p-2">{record.tailorName}</td>
              <td className="border border-gray-200 p-2">{record.styleNumber}</td>
              <td className="border border-gray-200 p-2">{record.qty}</td>
              <td className="border border-gray-200 p-2">
                <button
                  onClick={() => handleEdit(index)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AddRecord;
