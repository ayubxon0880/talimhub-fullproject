import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API, LoadingSpinner } from '../env';
import { toast } from 'react-toastify';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(0);
    const [size] = useState(6);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchUsers = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`${API}/admin/users`, {
                params: { page, size },
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setUsers(response.data.users);
            setTotalPages(response.data.totalPages);
        } catch (err) {
            setError('Failed to fetch users. Please try again.');
            toast.error('Failed to fetch users.');
            console.error('Error fetching users:', err);
        } finally {
            setLoading(false);
        }
    };

    const deleteUser = async (userId) => {
        try {
            await axios.delete(`${API}/user/delete/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            toast.success('User deleted successfully.');
            fetchUsers();
        } catch (err) {
            toast.error('Failed to delete user.');
            console.error('Error deleting user:', err);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [page]);

    const handlePreviousPage = () => {
        if (page > 0) setPage(page - 1);
    };

    const handleNextPage = () => {
        if (page < totalPages - 1) setPage(page + 1);
    };

    if (loading) return <LoadingSpinner />;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">User List</h1>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            {users.length === 0 ? (
                <div className="text-center mt-4">
                    <p>No users found.</p>
                    <button
                        onClick={fetchUsers}
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                    >
                        Reload
                    </button>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b">ID</th>
                                <th className="py-2 px-4 border-b">Firstname</th>
                                <th className="py-2 px-4 border-b">Lastname</th>
                                <th className="py-2 px-4 border-b">Phone</th>
                                <th className="py-2 px-4 border-b">Created Date</th>
                                <th className="py-2 px-4 border-b">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td className="py-2 px-4 border-b">{user.id}</td>
                                    <td className="py-2 px-4 border-b">{user.firstname}</td>
                                    <td className="py-2 px-4 border-b">{user.lastname}</td>
                                    <td className="py-2 px-4 border-b">{user.phone}</td>
                                    <td className="py-2 px-4 border-b">
                                        {new Date(user.createdAt).toLocaleString('en-US', {
                                            year: 'numeric',
                                            month: '2-digit',
                                            day: '2-digit',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            second: '2-digit',
                                            hour12: true,
                                        })}
                                    </td>
                                    <td className="py-2 px-4 border-b">
                                        <button
                                            onClick={() => deleteUser(user.id)}
                                            className="px-4 py-2 bg-red-500 text-white rounded"
                                            aria-label={`Delete user ${user.firstname} ${user.lastname}`}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <div className="flex justify-between items-center mt-4">
                <button
                    onClick={handlePreviousPage}
                    disabled={page === 0}
                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                    aria-label="Previous page"
                >
                    Previous
                </button>
                <span className="text-sm">Page {page + 1} of {totalPages}</span>
                <button
                    onClick={handleNextPage}
                    disabled={page >= totalPages - 1}
                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                    aria-label="Next page"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Users;