import React from "react";
import { LuUser, LuLogOut, LuPackage, LuGauge, LuPanelTop, LuHeadphones, LuChartColumn } from "react-icons/lu";
import { Role } from "@/modules/auth/domain/role";
import { useScreenType } from "@/shared/libs/useScreenTypes";
import Avatar from "@/shared/ui/layout/menu/Avatar";
import {Users} from "@/modules/auth/domain/users";

interface ProfileMenuProps {
    role: Role;
    handleLogout: () => void;
    user: Users;
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({ role, handleLogout, user }) => {
    const screenType = useScreenType();

    const getMenuItems = () => {
        switch (role) {
            case Role.REGISTERED_USER:
                return [
                    { label: "Profil", icon: <LuUser />, path: "/profile" },
                    { label: "Keluar", icon: <LuLogOut />, action: handleLogout },
                ];
            case Role.CUSTOMER:
                return [
                    { label: "Dashboard", icon: <LuGauge />, path: "/dashboard" },
                    { label: "Orders", icon: <LuPackage />, path: "/orders" },
                    { label: "Keluar", icon: <LuLogOut />, action: handleLogout },
                ];
            case Role.TRAVEL_AGENT:
                return [
                    { label: "Manage Trips", icon: <LuPackage />, path: "/trips" },
                    { label: "Partner Dashboard", icon: <LuGauge />, path: "/partner-dashboard" },
                    { label: "Keluar", icon: <LuLogOut />, action: handleLogout },
                ];
            case Role.ADMINISTRATOR:
                return [
                    { label: "Admin Panel", icon: <LuPanelTop />, path: "/admin" },
                    { label: "User Management", icon: <LuUser />, path: "/admin/users" },
                    { label: "Keluar", icon: <LuLogOut />, action: handleLogout },
                ];
            case Role.CUSTOMER_SUPPORT:
                return [
                    { label: "Ticket Management", icon: <LuHeadphones />, path: "/support/tickets" },
                    { label: "Keluar", icon: <LuLogOut />, action: handleLogout },
                ];
            case Role.PARTNER:
                return [
                    { label: "Partner Panel", icon: <LuPanelTop />, path: "/partner-panel" },
                    { label: "Analytics", icon: <LuChartColumn />, path: "/analytics" },
                    { label: "Keluar", icon: <LuLogOut />, action: handleLogout },
                ];
            default:
                return [];
        }
    };

    const menuItems = getMenuItems();

    return (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50">
            {/* ✅ Menampilkan Avatar & Nama hanya pada tablet & mobile */}
            {(screenType === "mobile" || screenType === "tablet") && (
                <div >

                    <div className="flex items-center gap-2 p-3 w-full text-left">
                        <Avatar imageUrl={user?.image || "/assets/image/default-avatar.jpg"} />
                        <span className="text-sm font-medium ">
                        {user?.firstName} {user?.lastName}
                        </span>
                    </div>
                    <hr />
                </div>
            )}

            {menuItems.map((item, index) => (
                <div key={index}>
                    {item.path ? (
                        <a href={item.path} className="flex items-center gap-2 p-3 hover:bg-gray-100">
                            {item.icon}
                            {item.label}
                        </a>
                    ) : (
                        <button onClick={item.action} className="flex items-center gap-2 p-3 w-full text-left hover:bg-gray-100">
                            {item.icon}
                            {item.label}
                        </button>
                    )}
                </div>
            ))}


        </div>
    );
};

export default ProfileMenu;
