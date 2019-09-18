/**
 * UnsplashClientPublic
 * Helper class for making search item queries to the Unsplash API v1.
 * This helpers can make queries to the Public Actions of the APi, for which
 * only the access key is needed.
 * The interface is simplified, so it allows fewer parameter options than the API.
 * There are 2 resources that this helper can access:
 * - search photos
 * - get random photo
 * The Unsplash API v1 is documented here:
 * https://unsplash.com/documentation
*/


const HTTP_METHOD = "GET";
const LOCATION = "https://api.unsplash.com";
const SEARCH_ENDPOINT = "/search/photos";
const RANDOM_ENDPOINT = "/photos/random";
const STR_CLIENT_ID = "client_id";
const PER_PAGE = 10;
const MAX_ITEMS = 30;


class UnsplashClientPublic {

    constructor(accessKey) {
        this.accessKey = accessKey;
        this.headers = {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Accept-Version": "v1",
        }
        this.init = {
            method: HTTP_METHOD,
            headers: this.headers,
        };
    }
    
    /**
     * Search photos by the value of a query string.
     * Return an Object containing an Array with the results.
     */
    search = async (query, page, perPage) => {
        const STR_QUERY = "query";
        const STR_PAGE = "page";
        const STR_PER_PAGE = "per_page";
        perPage = (perPage < 1) ? PER_PAGE : perPage;

        const params = [];
        params.push(this.encodeQueryParam(STR_CLIENT_ID, this.accessKey));
        params.push(this.encodeQueryParam(STR_QUERY, query));
        params.push(this.encodeQueryParam(STR_PAGE, page));
        params.push(this.encodeQueryParam(STR_PER_PAGE, perPage));

        const RESOURCE = LOCATION + SEARCH_ENDPOINT + "?" + params.join("&");
        const response = await fetch(RESOURCE, this.init);
        return await response.json();
    }
    
    /**
     * Get random photos by the value of a query string.
     * Returns an Array containing the results.
     */
    getRandomImage = async (query, count) => {
        const STR_QUERY = "query";
        const STR_COUNT = "count";
        count = (count < 1) ? MAX_ITEMS : count;
        count = (count <= MAX_ITEMS) ? count : MAX_ITEMS;

        const params = [];
        params.push(this.encodeQueryParam(STR_CLIENT_ID, this.accessKey));
        params.push(this.encodeQueryParam(STR_QUERY, query));
        params.push(this.encodeQueryParam(STR_COUNT, count));

        const RESOURCE = LOCATION + RANDOM_ENDPOINT + "?" + params.join("&");
        const response = await fetch(RESOURCE, this.init);
        return await response.json();
    }

    /**
     * Encode a single parameter name and its value of a query string.
     */
    encodeQueryParam = (name, value) => {
        return encodeURIComponent(name) + '=' + encodeURIComponent(value);
    }

}

export default UnsplashClientPublic;
