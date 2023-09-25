import { useLayoutEffect, useState, useEffect } from "react";
import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Line,
  Legend,
  Tooltip,
} from "recharts";

import adminService from "../../services/adminService";

import MainContainer from "../../components/container/MainContainer";
import UserCard from "../../components/card/UserCard";
import ActivityCard from "../../components/card/ActivityCard";

import "./index.css";

const dateToday = new Date().toISOString().slice(0, 10);

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [activeUser, setActiveUser] = useState(undefined);
  const [newUser, setNewUser] = useState(undefined);
  const [selectedUser, setSelectedUser] = useState(null);
  const [dailyActivity, setDailyActivity] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [width, height] = useWindowSize();

  const getAllUsers = () => {
    adminService.getAllUsers().then((res) => {
      setUsers(res.data);
    });
  };

  const getLoginToday = () => {
    adminService.getLoginToday().then((res) => {
      setActiveUser(res.data);
    });
  };

  const getRegisterToday = () => {
    adminService.getRegisterToday().then((res) => {
      setNewUser(res.data);
    });
  };

  const getDailyActivity = () => {
    adminService.getDailyActivity().then((res) => {
      setDailyActivity(res.data);
    });
  };

  useEffect(() => {
    getAllUsers();
    getLoginToday();
    getRegisterToday();
    getDailyActivity();
  }, []);

  return (
    <MainContainer>
      <div className="admin-info-container">
        <div>
          <ActivityCard title="Date" value={dateToday} />
        </div>
        <div>
          <ActivityCard title="Daily Active User" value={activeUser} />
        </div>
        <div>
          <ActivityCard title="New User" value={newUser} />
        </div>
      </div>
      <div className="admin-daily-activity">
        <LineChart width={width * 0.8} height={400} data={dailyActivity}>
          <XAxis dataKey="date" />
          <YAxis />
          <Legend />
          <Tooltip />
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <Line type="monotone" dataKey="loginCount" stroke="#8884d8" />
          <Line type="monotone" dataKey="registerCount" stroke="#82ca9d" />
        </LineChart>
      </div>
      <div className="admin-user-container">
        {users.map((user) => (
          <UserCard
            key={user._id}
            email={user.email}
            username={user.username}
            role={user.role}
            expanded={selectedUser === user._id}
            onClick={() => {
              setSelectedUser(selectedUser === user._id ? null : user._id);
            }}
            deleteAction={() => {
              adminService.deleteUser(user._id).then(() => {
                getAllUsers();
                getLoginToday();
                getRegisterToday();
              });
            }}
          />
        ))}
      </div>
    </MainContainer>
  );
}
