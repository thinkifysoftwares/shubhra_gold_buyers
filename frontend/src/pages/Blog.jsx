import React from "react";
import LegacyPage from "../components/LegacyPage";
import blogHTML from "../legacy/blog.html?raw";

function Blog() {
    return <LegacyPage html={blogHTML} />;
}

export default Blog;