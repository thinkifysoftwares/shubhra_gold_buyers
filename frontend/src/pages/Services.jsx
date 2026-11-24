import React from "react";
import LegacyPage from "../components/LegacyPage";
import servicesHTML from "../legacy/services.html?raw";

function Services() {
    return <LegacyPage html={servicesHTML} />;
}

export default Services;