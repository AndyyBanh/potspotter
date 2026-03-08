"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Navbar({ onToggleSidebar }: { onToggleSidebar?: () => void }) {
    const router = useRouter();
    const { isAuthenticated, logout } = useAuth();

    const handleLogout = () => {
        logout();
        router.push('/');
    };

    return (
        <nav className="flex items-center justify-between px-8 py-4 border-b bg-white">
            <div className="flex items-center gap-3">
                {onToggleSidebar && (
                    <button onClick={onToggleSidebar} className="p-2 hover:bg-gray-100 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="3" y1="6" x2="21" y2="6" />
                            <line x1="3" y1="12" x2="21" y2="12" />
                            <line x1="3" y1="18" x2="21" y2="18" />
                        </svg>
                    </button>
                )}
                <Link href="/" className="text-xl font-bold">Pot Spotter</Link>
            </div>
            <div className="flex gap-3">
                {isAuthenticated ? (
                    <Button
                        className="rounded-2xl bg-orange-400 hover:bg-orange-500"
                        size="lg"
                        onClick={handleLogout}
                    >
                        Logout
                    </Button>
                ) : (
                    <>
                        <Link href="/auth/login">
                            <Button className="rounded-2xl" size="lg" variant="ghost">
                                Login
                            </Button>
                        </Link>
                        <Link href="/auth/signup">
                            <Button className="rounded-2xl bg-orange-400 hover:bg-orange-500" size="lg">
                                Sign Up
                            </Button>
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
}
