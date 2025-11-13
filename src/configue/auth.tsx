
import {jwtDecode }from "jwt-decode";

export function getUserRole() {
    const token = localStorage.getItem("af.account");
    if (!token) return null;

    try {
        const decoded = jwtDecode(token);
        console.log(decoded);
        return decoded.role || null;
    } catch (e) {
        return null;
    }
}

export function isTokenExpired() {
    const token = localStorage.getItem("af.account");
    if (!token) return true;

    const {exp} = jwtDecode(token);
    return Date.now() >= exp * 1000;
}
