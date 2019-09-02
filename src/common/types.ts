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
     * A pre-defined selector that defines the DOM element that identifies a user.
     */
    userIdentElementSelector: string;
    /**
     * An integer value that defines how many levels up the app should go to append the tags and controls to, relative to the userIdentElementSelector. 
     * This is only required if the selector element is not suitable to add components to, such as an <a> tag. If this number is 0 or less, the userIdentElementSelector is used
     */
    userIdentElementParentAnchorIndex: number;
    /**
     * An integer value that defines how many levels up the app should go to affect the whole logical block for a site user post, relative to the userIdentElementSelector
     */
    userIdentElementParentBlockIndex: number;
    /**
     * A string representation of a regex pattern used to extract the username from the userIdentElement
     */
    usernameExtractionRegex: string;
    commentSectionContainer: string;
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