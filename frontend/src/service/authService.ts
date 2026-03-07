import axiosInstance from "@/api/axiosinstance";

export const signup = (email: string, password: string) =>
    axiosInstance.post("/api/users/signup", {email, password});

export const login = (email: string, password: string) =>
    axiosInstance.post('/v1/auth/login', {email, password});