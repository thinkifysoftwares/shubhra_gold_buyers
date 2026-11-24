import React from "react";
import LegacyPage from "../components/LegacyPage";
import aboutHTML from "../legacy/about.html?raw";

function About() {
    return <LegacyPage html={aboutHTML} />;
}

export default About;