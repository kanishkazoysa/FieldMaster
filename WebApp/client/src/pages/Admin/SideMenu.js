import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Icon } from '@iconify/react';
import logo from "../../images/logo.png"

import { Menu, ConfigProvider } from "antd";

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

const items = [
    getItem("Dashboard", "/admin", <Icon icon="material-symbols:dashboard-outline" />),
    getItem("User", "/admin/users", <Icon icon="ph:user-bold" />),
    getItem("Input Control", "/admin/inputcontrol", <Icon icon="ri:input-method-line" />),
    getItem("Mails", "/admin/mails", <Icon icon="ri:message-2-line" />),
];

// submenu keys of first level
const rootSubmenuKeys = ["sub1", "sub2", "sub3", "sub4"];

function SideMenu() {
    const location = useLocation();
    const navigate = useNavigate();
    const [openKeys, setOpenKeys] = useState(["/admin"]);
    const [selectedKeys, setSelectedKeys] = useState("/admin");

    const handleIconPress = () => {
        navigate("/home");
    }

    useEffect(() => {
        const pathName = location.pathname;
        setSelectedKeys(pathName);
    }, [location.pathname]);

    const onOpenChange = (keys) => {
        const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
        if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };
    return (
        <div className="Admin_SideMenu">
            <img src={logo} alt="logo" className="admin_sidebar_logo" onClick={handleIconPress} />
            <ConfigProvider
                theme={{
                    components: {
                        Menu: {
                            iconSize: "20px",
                            itemHeight: "40px",
                            subMenuItemBg : "#ffffff",
                        },
                    },
                }}
            >
                <Menu
                    mode="inline"
                    openKeys={openKeys}
                    selectedKeys={[selectedKeys]}
                    onOpenChange={onOpenChange}
                    onClick={(item) => {
                        navigate(item.key);
                    }}
                    style={{
                        width: 256,
                        textAlign: "left",
                    }}
                    items={items}
                />
            </ConfigProvider>
        </div>
    );
}

export default SideMenu;
