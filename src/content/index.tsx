import * as React from "react";
import * as ReactDOM from "react-dom";
import ContentApp from "./components/content-app";

const root = document.createElement("div");
root.setAttribute("id", "user-tagger-root");

document.body.append(root);

ReactDOM.render(
    <ContentApp />,
    root
);