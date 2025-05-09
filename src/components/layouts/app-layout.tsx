import React, { FC } from "react";

export interface AppLayoutProps {
    children: React.ReactNode;
}

export const AppLayout:FC<AppLayoutProps> = ({ children }) => {
    return (React.createElement("section", { className: "min-h-screen bg-gray-50 px-4 py-2" }, children));
}