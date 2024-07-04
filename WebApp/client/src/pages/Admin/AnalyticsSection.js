import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import AxiosInstance from '../../AxiosInstance';
import LoginCountChart from './LoginCountChart';
import { Doughnut } from "react-chartjs-2";


const AnalyticsSection = ({users, setLoading}) => {

    const [totalUsers, setTotalUsers] = useState(users.length);
    const [totalCustomers, setTotalCustomers] = useState(0);
    const [totalAdmins, setTotalAdmins] = useState(0);
    const [totalLogins, setTotalLogins] = useState(0);
    const [totalUnverified, setTotalUnverified] = useState(0);

    const chartData = {
        labels: ["Customer", "Admin", "Unverified"],
        datasets: [
            {
                data: [totalCustomers, totalAdmins, totalUnverified],
                backgroundColor: ["#4bc0c0", "#36A2EB", "#ff6384"],
                hoverBackgroundColor: ["#4bc0c0", "#36A2EB", "#ff6384"]
            }
        ]
    }

    const options = {
        plugins: {
            legend: {
                display: false, // Hide the legend
            },
        },
    };

    useEffect(() => {
        let customers = 0;
        let admins = 0;
        let unverified = 0;

        users.forEach((user) => {
            if (user.isAdmin === true) {
                admins++;
            } else if (user.isVerified === true){
                customers++;
            }

            if (user.isVerified === false) {
                unverified++;
            }
        });

        setTotalCustomers(customers);
        setTotalAdmins(admins);
        setTotalUnverified(unverified);
    }, [users]);

    //Fetch login data
    const [loginCountData, setLoginCountData] = useState([]);
    const [dateData, setDateData] = useState([]);

    const generateLast30Days = () => {
        const today = new Date();
        const days = [];
        for (let i = 29; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(today.getDate() - i);
            days.push(date.toISOString().slice(0, 10));
        }
        return days;
    };

    const countLogins = (loginData) => {
        let count = 0;

        loginData.forEach((lData) => {
            count = count + lData.count;
        });

        return count
        
    }


    const fetchLoginCountData = async () => {
        try {
            const response = await AxiosInstance.post("/api/users/loginData");
            const data = response.data;
    
            // Generate an array of the last 30 days
            const last30Days = generateLast30Days();
    
            // Create an array of view count data for the last 30 days
            const last30DaysData = last30Days.map((day) => {
                const entry = data.find((item) => item._id === day);
                return { date: day, count: entry ? entry.count : 0 };
            });
    
            setLoginCountData(last30DaysData);
            setDateData(last30Days)

            setTotalLogins(countLogins(last30DaysData))

            // createChart(last30Days, last30DaysData);
        } catch (error) {
            console.error("Error fetching login data:", error);
        }
    };


    useEffect(() => {
        fetchLoginCountData()
    },[]);

    //Time count
    const [currentTime, setCurrentTime] = useState(new Date());
    const [isDaytime, setIsDaytime] = useState(true);

    useEffect(() => {
        const now = new Date();
        const currentHour = now.getHours();
        setIsDaytime(currentHour >= 6 && currentHour < 18);
    }, []);

    useEffect(() => {
        const timerID = setInterval(() => tick(), 1000);

        return function cleanup() {
            clearInterval(timerID);
        };
    });

    function tick() {
        setCurrentTime(new Date());
    }

    const formattedTime = currentTime.toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    });

    return (
        <div>
            <div className="admin_dashboard_card_main_section">
                <div className="admin_dashboard_card card1">
                    <h1>All Users</h1>
                    <h2>{totalUsers}</h2>
                    <Link
                        to="#"
                        style={{ textDecoration: "none" }}
                    >
                       
                    </Link>
                </div>
                <div className="admin_dashboard_card card2">
                    <h1>Customers</h1>
                    <h2 style={{ fontSize: "32px" }}>
                        {totalCustomers}{" "}
                        
                    </h2>
                    <Link
                        to="#"
                        style={{ textDecoration: "none" }}
                    >
                        
                    </Link>
                </div>
                <div className="admin_dashboard_card card3">
                    <h1>Admins</h1>
                    <h2>{totalAdmins}</h2>
                    <Link
                        to="#"
                        style={{ textDecoration: "none" }}
                    >
                        
                    </Link>
                </div>
                <div className="admin_dashboard_card card4">
                    <h1>Total Logins</h1>
                    <h2>{totalLogins}</h2>
                    <Link
                        to="#"
                        style={{ textDecoration: "none" }}
                    >
                        
                    </Link>
                </div>
                <div className="admin_dashboard_card card5">
                    <h1>Unverified Users</h1>
                    <h2>{totalUnverified}</h2>
                    <Link
                        to="#"
                        style={{ textDecoration: "none" }}
                    >
                        
                    </Link>
                </div>
                <div className="main_dashboard_realtime_insights_container center">
                    {isDaytime ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="100"
                            height="100"
                            viewBox="0 0 69 69"
                            fill="none"
                        >
                            <path
                                d="M34.5 53.3182C29.5091 53.3182 24.7226 51.3356 21.1935 47.8065C17.6644 44.2774 15.6818 39.4909 15.6818 34.5C15.6818 29.5091 17.6644 24.7226 21.1935 21.1935C24.7226 17.6644 29.5091 15.6818 34.5 15.6818C39.4909 15.6818 44.2774 17.6644 47.8065 21.1935C51.3356 24.7226 53.3182 29.5091 53.3182 34.5C53.3182 39.4909 51.3356 44.2774 47.8065 47.8065C44.2774 51.3356 39.4909 53.3182 34.5 53.3182ZM34.5 47.0455C37.8273 47.0455 41.0182 45.7237 43.371 43.371C45.7237 41.0182 47.0455 37.8273 47.0455 34.5C47.0455 31.1727 45.7237 27.9818 43.371 25.629C41.0182 23.2763 37.8273 21.9545 34.5 21.9545C31.1727 21.9545 27.9818 23.2763 25.629 25.629C23.2763 27.9818 21.9545 31.1727 21.9545 34.5C21.9545 37.8273 23.2763 41.0182 25.629 43.371C27.9818 45.7237 31.1727 47.0455 34.5 47.0455ZM31.3636 0H37.6364V9.40909H31.3636V0ZM31.3636 59.5909H37.6364V69H31.3636V59.5909ZM7.88796 12.3228L12.3228 7.88796L18.975 14.5402L14.5402 18.975L7.88796 12.3228ZM50.025 54.4598L54.4598 50.025L61.112 56.6772L56.6772 61.112L50.025 54.4598ZM56.6772 7.88482L61.112 12.3228L54.4598 18.975L50.025 14.5402L56.6772 7.88796V7.88482ZM14.5402 50.025L18.975 54.4598L12.3228 61.112L7.88796 56.6772L14.5402 50.025ZM69 31.3636V37.6364H59.5909V31.3636H69ZM9.40909 31.3636V37.6364H0V31.3636H9.40909Z"
                                fill="#FFD600"
                            />
                        </svg>
                    ) : (
                        <svg
                            width="100"
                            height="100"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M18 2.75C17.5858 2.75 17.25 2.41421 17.25 2C17.25 1.58579 17.5858 1.25 18 1.25H22C22.3034 1.25 22.5768 1.43273 22.6929 1.71299C22.809 1.99324 22.7449 2.31583 22.5304 2.53033L19.8107 5.25H22C22.4142 5.25 22.75 5.58579 22.75 6C22.75 6.41421 22.4142 6.75 22 6.75H18C17.6967 6.75 17.4232 6.56727 17.3071 6.28701C17.191 6.00676 17.2552 5.68417 17.4697 5.46967L20.1894 2.75H18ZM13.5 8.75C13.0858 8.75 12.75 8.41421 12.75 8C12.75 7.58579 13.0858 7.25 13.5 7.25H16.5C16.8034 7.25 17.0768 7.43273 17.1929 7.71299C17.309 7.99324 17.2449 8.31583 17.0304 8.53033L15.3107 10.25H16.5C16.9142 10.25 17.25 10.5858 17.25 11C17.25 11.4142 16.9142 11.75 16.5 11.75H13.5C13.1967 11.75 12.9232 11.5673 12.8071 11.287C12.691 11.0068 12.7552 10.6842 12.9697 10.4697L14.6894 8.75H13.5Z"
                                fill="#1C274C"
                            />
                            <path
                                opacity="0.5"
                                d="M12 22C17.5228 22 22 17.5228 22 12C22 11.5373 21.3065 11.4608 21.0672 11.8568C19.9289 13.7406 17.8615 15 15.5 15C11.9101 15 9 12.0899 9 8.5C9 6.13845 10.2594 4.07105 12.1432 2.93276C12.5392 2.69347 12.4627 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                fill="#1C274C"
                            />
                        </svg>
                    )}

                    <div className="main_dashboard_date_container">
                        <h1>{formattedTime}</h1>
                        <h2>{currentTime.toDateString()}</h2>
                    </div>
                </div>
            </div>
            <hr />
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ flex: 1 }}>
                <h3 style={{marginLeft : "30px"}}>Users by Type</h3>
                <div className="chart-container">
                        <Doughnut data={chartData} options={options} />
                        <div className="chart-legend">
                            <div className="legend-item">
                                <div
                                    className="legend-color"
                                    style={{ backgroundColor: "#4bc0c0" }}
                                ></div>
                                <p>Customers</p>
                            </div>
                            <div className="legend-item">
                                <div
                                    className="legend-color"
                                    style={{ backgroundColor: "#36A2EB" }}
                                ></div>
                                <p>Admins</p>
                            </div>
                            <div className="legend-item">
                                <div
                                    className="legend-color"
                                    style={{ backgroundColor: "#ff6384" }}
                                ></div>
                                <p>Unverified</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ width: '3px', backgroundColor: '#000000', height: '100%' }}></div>
                <div style={{ flex: 1 }}>
                    <h3>Logins in past 30 Days</h3>
                    <div style={{padding:"10px 10px 20px 0", marginRight : "30px", height : "370px"}}>
                        <LoginCountChart/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsSection;