import React from "react";
import { useNavigate } from "react-router-dom";


export default function AdminPage() {
    const navigate = useNavigate();

    return (
        <div className="admin-dashboard">
            <h1>ברוך הבא לממשק הניהול</h1>

            <div className="admin-buttons">
                <button onClick={() => navigate("/admin/allUsers")}>הצגת כל המשתמשים</button>
                <button onClick={() => navigate("/admin/allEpisodes")}>פרקים</button>
                <button onClick={() => navigate("/admin/allFutureInterviews")}>ראיונות עתידיים</button>

            </div>
        </div>
    );
}