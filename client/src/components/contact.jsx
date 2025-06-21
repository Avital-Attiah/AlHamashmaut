import React, { useState } from "react";
import '../style/contactStyle.css';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
    });
    const [status, setStatus] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("https://formspree.io/f/xqkrzyne", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    subject: `הודעה מאת ${formData.name}`,
                    message: `נושא הפניה: ${formData.subject}\nשם: ${formData.name}\nמייל: ${formData.email}\nטלפון: ${formData.phone}`,
                }),
            });
            if (response.ok) {
                setStatus("ההודעה נשלחה בהצלחה!");
                setFormData({ name: "", email: "", phone: "", subject: "" });
            } else {
                throw new Error("שליחה נכשלה");
            }
        } catch (err) {
            setStatus("אירעה שגיאה בשליחה. נסי שוב מאוחר יותר.");
        }
    };

    return (
        <div className="contact-container">
            <h1 className="contact-title">השאירו לנו פנייה וניצור קשר בהקדם האפשרי</h1>
            <form onSubmit={handleSubmit} className="contact-form">
                <div className="contact-row">
                    <input
                        type="text"
                        name="name"
                        placeholder=":שם"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="tel"
                        name="phone"
                        placeholder=":מס' טלפון"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder=":כתובת מייל"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <textarea
                    name="subject"
                    placeholder=":נושא הפנייה"
                    value={formData.subject}
                    onChange={handleChange}
                    rows="5"
                    required
                ></textarea>
                <button type="submit">שליחה</button>
                {status && <div className="contact-status">{status}</div>}
            </form>
        </div>
    );
}
