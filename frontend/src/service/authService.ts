import axiosInstance from "@/api/axiosinstance";

export const signup = (email: string, password: string) =>
    axiosInstance.post("/api/auth/signup", {email, password});

export const login = (email: string, password: string) =>
    axiosInstance.post('/api/auth/login', {email, password});