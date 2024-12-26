import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CreateTask = () => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    assignedTo: "",
    deadline: "",
    priority: "Normal",
  });
  const [employees, setEmployees] = useState([]); // State for employees
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    fetchEmployees(); // Fetch employees when the component mounts
  }, []);

  const fetchEmployees = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:4000/api/admin/users",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setEmployees(response.data); // Assuming the response contains an array of employees
    } catch (err) {
      setError("Failed to fetch employees.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:4000/api/manager/tasks", task, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Task Created successfully!"); // Success notification

      navigate("/api/manager"); // Redirect to task list after creation
    } catch (err) {
      toast.error("Failed to create task"); // Success notification
      setError("Failed to create task.");
    }
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Create New Task</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
        <input
          type="text"
          name="title"
          placeholder="Task Title"
          onChange={handleChange}
          required
          className="border border-gray-300 p-2 w-full mb-2 rounded"
        />
        <textarea
          name="description"
          placeholder="Task Description"
          onChange={handleChange}
          required
          className="border border-gray-300 p-2 w-full mb-2 rounded"
        />
        <select
          name="assignedTo"
          value={task.assignedTo}
          onChange={handleChange}
          required
          className="border border-gray-300 p-2 w-full mb-2 rounded"
        >
          <option value="">Select Employee</option>
          {employees.map((employee) => (
            <option key={employee._id} value={employee._id}>
              {employee.username}
            </option>
          ))}
        </select>
        <input
          type="date"
          name="deadline"
          onChange={handleChange}
          required
          className="border border-gray-300 p-2 w-full mb-2 rounded"
        />
        <select
          name="priority"
          value={task.priority}
          onChange={handleChange}
          className="border border-gray-300 p-2 w-full mb-2 rounded"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Create Task
        </button>
      </form>
    </div>
  );
};

export default CreateTask;
