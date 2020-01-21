import * as React from "react";
import { LooseObject } from "../../common/types";
import SiteUserService from "../../common/services/site-user-service";
import UsernameExtractionService from "../../common/services/username-extraction-service";
import SiteService from "../../common/services/site-service";
import StorageService from "../../common/services/storage-service";

const ss = new StorageService();

const ServiceContextObject = {
    SiteUserService: new SiteUserService(ss),
    SiteService: new SiteService(),
    UsernameExtractionService: new UsernameExtractionService(),
};

const ServiceContext = React.createContext(ServiceContextObject);
export default ServiceContext;