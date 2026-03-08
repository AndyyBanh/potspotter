"use client";

import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "react-hot-toast";
import { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
    return (
        <AuthProvider>
            <Toaster position="top-center" />
            {children}
        </AuthProvider>
    );
}
