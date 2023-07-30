import { redirect } from "react-router-dom";
import { logout } from "../util/auth";

export function action() {
    logout();
    return redirect('/');
}