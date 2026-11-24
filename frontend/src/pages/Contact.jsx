import React from "react";
import LegacyPage from "../components/LegacyPage";
import contactHTML from "../legacy/contact.html?raw";

function Contact() {
    return <LegacyPage html={contactHTML} />;
}

export default Contact;