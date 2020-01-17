import * as React from "react";
import UsernameExtractionService from "../../common/services/username-extraction-service";

const UsernameExtractionServiceContext = React.createContext(new UsernameExtractionService());

export default UsernameExtractionServiceContext;