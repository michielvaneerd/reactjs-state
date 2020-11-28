import { useState, useEffect } from 'react';

/**
 * The useFetch hook: fetch API response and save it in the cache.
 * The next time it uses the cached response.
 **/
const _cache = {};

export default function useFetch(url) {

    const [data, _setData] = useState((url in _cache) ? _cache[url] : null);
    const [error, setError] = useState(null);

    useEffect(function () {

        if (data) {
            return;
        }

        (async function () {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw Error("Response is not ok");
                }
                const json = await response.json();
                _cache[url] = json;
                _setData(json);
            } catch (err) {
                setError(err);
            }
        }());

    }, [url, data]);

    function setData(data) {
        _cache[url] = data;
        _setData(data);
    }

    return [ data, error, setData ];

}