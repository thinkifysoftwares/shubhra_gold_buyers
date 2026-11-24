import React from "react";
import LegacyPage from "../components/LegacyPage";
import branchesHTML from "../legacy/branches.html?raw";

function Branches() {
    return <LegacyPage html={branchesHTML} />;
}

export default Branches;