const MAX_ITEMS = 30;


class UnsplashClientPublic {

    constructor(accessKey) {
        
    }
    
    search = (query, page, perPage, collections, orientation) => {
        
    }

    getRandomImage = (featured, username, query, orientation, count) => {
        count = (count <= MAX_ITEMS) ? count : MAX_ITEMS;
    }

}

export default UnsplashClientPublic;
