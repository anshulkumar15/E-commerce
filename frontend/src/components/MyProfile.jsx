import React, { useState, useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { User, Edit, Save, X } from "lucide-react";

const MyProfile = () => {
    const { user, updateUser } = useContext(ShopContext);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        if (user) {
            setName(user.name || "");
            setEmail(user.email || "");
            setPhone(user.phone || "");
        }
    }, [user]);

    const handleUpdate = () => {
        updateUser({ name, email, password });
        setEditMode(false);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 flex items-center">
                    <User className="text-white w-12 h-12 mr-4" />
                    <h2 className="text-3xl font-bold text-white">User Profile</h2>
                </div>

                <div className="p-6">
                    {editMode ? (
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            handleUpdate();
                        }}>
                            <div className="space-y-4">
                                <div>
                                    <label 
                                        htmlFor="name" 
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                    >
                                        Name
                                    </label>
                                    <input
                                        id="name"
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        required
                                    />
                                </div>

                                <div>
                                    <label 
                                        htmlFor="email" 
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                    >
                                        Email
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        required
                                    />
                                </div>

                                <div>
                                    <label 
                                        htmlFor="password" 
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                    >
                                        Password
                                    </label>
                                    <input
                                        id="password"
                                        type="password"
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        placeholder="Enter new password to update"
                                    />
                                </div>

                                <div className="flex space-x-4">
                                    <button
                                        type="submit"
                                        className="flex items-center justify-center w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out"
                                    >
                                        <Save className="mr-2 w-5 h-5" />
                                        Save Changes
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setEditMode(false)}
                                        className="flex items-center justify-center w-full bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300 transition duration-300 ease-in-out"
                                    >
                                        <X className="mr-2 w-5 h-5" />
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </form>
                    ) : (
                        <div className="space-y-4">
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <div className="flex items-center mb-2">
                                    <User className="mr-3 text-blue-500 w-6 h-6" />
                                    <p className="text-lg font-semibold text-gray-800">{name}</p>
                                </div>
                                <div className="space-y-2">
                                    <p className="flex items-center text-gray-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                        </svg>
                                        {email}
                                    </p>
                                    {phone && (
                                        <p className="flex items-center text-gray-600">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                            </svg>
                                            {phone}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <button
                                onClick={() => setEditMode(true)}
                                className="w-full flex items-center justify-center bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out"
                            >
                                <Edit className="mr-2 w-5 h-5" />
                                Edit Profile
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyProfile;