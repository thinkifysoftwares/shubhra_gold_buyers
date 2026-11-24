
import React from "react";
import parse, { domToReact } from "html-react-parser";
import { Link } from "react-router-dom";

import AppointmentForm from "./AppointmentForm";

function LegacyPage({ html }) {

    const bodyMatch = html.match(
        /<body[^>]*>([\s\S]*?)<\/body>/i
    );

    const bodyContent = bodyMatch
        ? bodyMatch[1]
        : html;

    const options = {
        replace: (node) => {

            if (node.type !== "tag") return;

            // Remove old navbar
            if (node.name === "nav") {
                return <></>;
            }

            // Remove old footer
            if (node.name === "footer") {
                return <></>;
            }

            // Replace old static forms
            if (node.name === "form") {
                return <AppointmentForm />;
            }

            // Convert image paths
            if (node.name === "img") {

                const props = { ...node.attribs };

                if (
                    props.src &&
                    !props.src.startsWith("http") &&
                    !props.src.startsWith("/") &&
                    !props.src.startsWith("data:")
                ) {
                    props.src = "/assets/" + props.src;
                }

                // Important: img must not have children
                return React.createElement("img", {
                    ...props,
                    alt: props.alt || "Image"
                });
            }

            // Convert old HTML links into React links
            if (
                node.name === "a" &&
                node.attribs.href?.endsWith(".html")
            ) {

                const routes = {
                    "index.html": "/",
                    "about.html": "/about",
                    "services.html": "/services",
                    "branches.html": "/branches",
                    "blog.html": "/blog",
                    "contact.html": "/contact"
                };

                const destination =
                    routes[node.attribs.href];

                if (destination) {
                    return (
                        <Link
                            to={destination}
                            className={node.attribs.class}
                        >
                            {domToReact(node.children, options)}
                        </Link>
                    );
                }
            }
        }
    };

    return (
        <div className="legacy-page">
            {parse(bodyContent, options)}
        </div>
    );
}

export default LegacyPage;
