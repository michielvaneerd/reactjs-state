const MyCache = {

};

MyCache.getByKey = function(key) {
    return new Promise(function(resolve, reject) {
        const t = setTimeout(function() {
            clearTimeout(t);
            resolve(MyCache[key]);
        }, 300);
    });
};

export default MyCache;