/**
 * Represents a website page that displays user comments
 */
export interface Site {
    /**
     * An identifier for this comment page
     */
    id: string;
    /**
     * A name for this comment page, usually just the name of the site this page will be on, unless there are more than one type of comment page on a site
     */
    name: string;
    /**
     * The domain this comment page appears on.
     */
    domain: string;
    /**
     * A regex pattern that should be used to identify if the browser's location matches this comment page, and therefore this comment page should be used
     */
    locationPattern: string;
    /**
     * A pre-defined selector that defines the DOM element that tags will be added to.
     */
    userIdentElementSelector: string;
}

/**
 * Represents a site's user
 */
export interface SiteUser {
    username: string;
    tags: Array<UserTag>;
}

/**
 * Represents a tag an extension user would apply to a site user
 */
export interface UserTag {
    name: string;
    rules: Array<TagRule>;
}

/**
 * Represents a rule to be applied to a tag by the extension user, e.g. hide users with x tag
 */
export interface TagRule {
    name: string;
}