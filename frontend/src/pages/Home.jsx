
import React from "react";

import LegacyPage from "../components/LegacyPage";

import homeHTML from "../legacy/index.html?raw";

function Home() {

    return (
        <LegacyPage html={homeHTML} />
    );

}

export default Home;
