import * as React from "react";
import * as ReactDOM from "react-dom";
import ContentApp from "./components/content-app";
import SiteService from "../common/services/site-service";
import ChromeStorageService from "../common/services/chrome-storage-service";
import SiteUserService from "../common/services/site-user-service";
import UsernameExtractionService from "../common/services/username-extraction-service";

const root = document.createElement("div");
root.setAttribute("id", "user-tagger-root");

document.body.append(root);

// todo update this to check for if FF, chrome etc and use appropriate
const storageService = new ChromeStorageService();
const siteUserService = new SiteUserService();
const extractionService = new UsernameExtractionService();
const siteService = new SiteService(storageService);



ReactDOM.render(
    <ContentApp 
        siteService={siteService}
        siteUserService={siteUserService}
        extractionService={extractionService} />,
    root
);