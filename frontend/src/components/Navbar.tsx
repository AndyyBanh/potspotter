"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { RxHamburgerMenu } from "react-icons/rx";
import toast from "react-hot-toast";

export default function Navbar({ onToggleSidebar }: { onToggleSidebar?: () => void }) {
    const router = useRouter();
    const { isAuthenticated, logout } = useAuth();

    const handleLogout = () => {
        logout();
        router.push('/');
        toast.success('Successfully logged out');
    };

    return (
        <nav className="flex items-center justify-between px-8 py-4 border-b bg-white">
            <div className="flex items-center gap-3">
                {onToggleSidebar && (
                    <Button onClick={onToggleSidebar} variant="ghost" className="p-2 hover:bg-gray-100 rounded-lg" size="lg">
                        <RxHamburgerMenu />
                    </Button>
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
