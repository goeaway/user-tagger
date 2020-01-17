import * as React from "react";
import SiteUserService from "../../common/services/site-user-service";

const SiteUserServiceContext = React.createContext(new SiteUserService());

export default SiteUserServiceContext;