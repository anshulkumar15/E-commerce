import { useState, useEffect } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Users = ({ token }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedUserOrders, setSelectedUserOrders] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, [token]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(backendUrl + "/api/fetch/users", {
        headers: { token },
      });

      if (response.data.success) {
        setUsers(response.data.users);
      } else {
        toast.error("Failed to fetch users");
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setLoading(false);
    }
  };

  const deleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }

    try {
      setLoading(true);
      const response = await axios.delete(
        `${backendUrl}/api/user/delete/${userId}`,
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message || "User deleted successfully");
        fetchUsers();
      } else {
        toast.error(response.data.message || "Failed to delete user");
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setLoading(false);
    }
  };

  const viewUserOrders = async (userId) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${backendUrl}/api/user/${userId}/orders`,
        { headers: { token } }
      );

      if (response.data.success) {
        setSelectedUserOrders(response.data.orders);
        setIsModalOpen(true);
      } else {
        toast.error(response.data.message || "Failed to fetch user orders");
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("orders not available");
      setLoading(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUserOrders(null);
  };

  return (
    <div className="flex flex-col w-full gap-8">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-6">Manage Users</h2>
        {loading && <p>Loading users...</p>}

        {!loading && users.length === 0 && (
          <p className="text-gray-500">No users found.</p>
        )}

        {!loading && users.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 text-left">Name</th>
                  <th className="py-3 px-4 text-left">Email</th>
                  <th className="py-3 px-4 text-left">Phone</th>
                  <th className="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="border-t">
                    <td className="py-3 px-4">{user.name}</td>
                    <td className="py-3 px-4">{user.email}</td>
                    <td className="py-3 px-4">{user.phone}</td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => viewUserOrders(user._id)}
                          className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
                        >
                          View Orders
                        </button>
                        <button
                          onClick={() => deleteUser(user._id)}
                          className="px-3 py-1 bg-red-600 text-white rounded text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {isModalOpen && selectedUserOrders && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl max-h-[80vh] overflow-y-auto">
      <h2 className="text-2xl font-bold mb-4">User Orders</h2>
      {selectedUserOrders.length > 0 ? (
        <ul className="space-y-4">
          {selectedUserOrders.map((order) => (
            <li key={order._id} className="border p-4 rounded-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p>
                    <strong className="text-gray-700">Order ID:</strong> {order._id}
                  </p>
                  <p>
                    <strong className="text-gray-700">Order Date:</strong>{" "}
                    {new Date(order.date).toLocaleDateString()}
                  </p>
                  <p>
                    <strong className="text-gray-700">Amount:</strong> ${order.amount}
                  </p>
                  <p>
                    <strong className="text-gray-700">Payment Method:</strong>{" "}
                    {order.paymentMethod}
                  </p>
                  <p>
                    <strong className="text-gray-700">Payment Status:</strong>{" "}
                    {order.payment ? "Paid" : "Not Paid"}
                  </p>
                  <p>
                    <strong className="text-gray-700">Order Status:</strong> {order.status}
                  </p>
                </div>
                <div>
                  <p>
                    <strong className="text-gray-700">Address:</strong>
                  </p>
                  <p className="ml-4">
                    {order.address.street}, {order.address.city}, {order.address.state},{" "}
                    {order.address.country} {order.address.zipcode}
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <strong className="text-gray-700">Items:</strong>
                <ul className="mt-2 space-y-2">
                  {order.items.map((item) => (
                    <li
                      key={item._id}
                      className="border p-3 rounded-md grid grid-cols-1 md:grid-cols-3 gap-2"
                    >
                      <div>
                        <p>
                          <strong className="text-gray-700">Name:</strong> {item.name}
                        </p>
                        <p>
                          <strong className="text-gray-700">Quantity:</strong> {item.quantity}
                        </p>
                        <p>
                          <strong className="text-gray-700">Price:</strong> ${item.price}
                        </p>
                      </div>
                      <div>
                        <p>
                          <strong className="text-gray-700">Size:</strong> {item.size}
                        </p>
                        <p>
                          <strong className="text-gray-700">Category:</strong> {item.category}
                        </p>
                        <p>
                          <strong className="text-gray-700">Sub Category:</strong>{" "}
                          {item.subCategory}
                        </p>
                      </div>
                      <div>
                        <p>
                          <strong className="text-gray-700">Description:</strong>{" "}
                          {item.description}
                        </p>
                        {item.image && item.image[0] && (
                          <img
                            src={item.image[0]}
                            alt={item.name}
                            className="w-full h-auto rounded-md mt-2"
                          />
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No orders found for this user.</p>
      )}
      <button
        onClick={closeModal}
        className="mt-6 px-4 py-2 bg-gray-600 text-white rounded"
      >
        Close
      </button>
    </div>
  </div>
)}
    </div>
  );
};

export default Users;