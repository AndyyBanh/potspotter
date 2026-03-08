"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        if (typeof window !== 'undefined') {
            return !!localStorage.getItem('token');
        }
        return false;
    });

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        router.push('/');
    };

    return (
        <nav className="flex items-center justify-end px-8 py-4">
            <div className="flex gap-3">
                {isLoggedIn ? (
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