import React, { useState, useEffect } from 'react';
import UserService from '../service/UserService';
import { Link } from 'react-router-dom';

function ProfilePage() {
    const [profileInfo, setProfileInfo] = useState({});

    useEffect(() => {
        fetchProfileInfo();
    }, []);

    const fetchProfileInfo = async () => {
        try {
            const token = localStorage.getItem('token'); // Retrieve the token from localStorage
            const response = await UserService.getYourProfile(token);
            setProfileInfo(response.ourUsers);
        } catch (error) {
            console.error('Error fetching profile information:', error);
        }
    };

    return (
        <div className="profile-page-container flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Profile Information</h2>

                <div className="space-y-4 text-gray-700">
                    <p className="text-lg">
                        <span className="font-semibold">Name:</span> {profileInfo.name || 'Loading...'}
                    </p>
                    <p className="text-lg">
                        <span className="font-semibold">Email:</span> {profileInfo.email || 'Loading...'}
                    </p>
                    <p className="text-lg">
                        <span className="font-semibold">City:</span> {profileInfo.city || 'Loading...'}
                    </p>
                </div>

                {profileInfo.role === "ADMIN" && (
                    <div className="mt-6 text-center">
                        <Link
                            to={`/update-user/${profileInfo.id}`}
                            className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                        >
                            Update This Profile
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProfilePage;
