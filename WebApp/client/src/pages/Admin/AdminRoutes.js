import React, {useState, useEffect} from "react";
import { Routes, Route } from "react-router-dom";
import ManageUsers from "./ManageUsers";
import InputControl from "./InputControl";
import AnalyticsSection from "./AnalyticsSection";
import AxiosInstance from "../../AxiosInstance";
import { message } from "antd";
import { BeatLoader } from "react-spinners";

function AdminRoutes() {
    const [isLoading, setIsLoading] = React.useState(true);
    const [userList, setUserList] = React.useState([]);

    const fetchUsers = async () => {
        try {
            const response = await AxiosInstance.get("/api/users/getAllUsers");
            setUserList(response.data.users);
            setIsLoading(false);
        } catch (error) {
            console.error("Failed to fetch users:", error);
            message.error("Failed to fetch users");
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div>
            {isLoading ? (
                <div className="loader-container">
                    <BeatLoader size={20} color="#007BFF" />
                </div>
            ) : (
            <Routes>
                <Route path="/" element={<AnalyticsSection
                        users={userList}
                        setLoading={setIsLoading}
                    />} />
                <Route path="/users" element={<ManageUsers />} />
                <Route path="/mails" element={<InputControl />} />
                <Route path="/inputcontrol" element={<InputControl />} />
                <Route path="*" element={<ManageUsers />} />

            </Routes>
            )}
        </div>
    );
}

export default AdminRoutes;
