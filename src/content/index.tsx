import * as React from "react";
import * as ReactDOM from "react-dom";
import ContentApp from "./components/content-app";
import SiteService from "../common/services/site-service";
import UserTaggerAPI from "../common/services/user-tagger-api";

// todo update this to check for if FF, chrome etc and use appropriate
const siteService = new SiteService();

if(siteService.locationSupported()) {
    const root = document.createElement("div");
    root.setAttribute("id", "user-tagger-root");
    
    document.body.append(root);
    if(!(window as any).userTagger) {
        (window as any).userTagger = new UserTaggerAPI(siteService);
    }
    
    ReactDOM.render(
        <ContentApp siteService={siteService} />,
        root
    );
}