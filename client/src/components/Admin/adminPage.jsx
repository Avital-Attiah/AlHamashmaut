import React from "react";
import {Outlet, useNavigate } from "react-router-dom";


export default function AdminPage() {
    const navigate = useNavigate();

    return (
        <div className="admin-dashboard">
            <h1>ברוך הבא לממשק הניהול</h1>

            <div className="admin-buttons">
                <button onClick={() => navigate("allUsers")}>הצגת כל המשתמשים</button>
                <button onClick={() => navigate("allEpisodes")}>פרקים</button>
                <button onClick={() => navigate("allFutureInterviews")}>ראיונות עתידיים</button>

            </div>
               <Outlet />
        </div>
        
    );
}