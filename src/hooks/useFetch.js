import { useEffect, useReducer, useRef, useState } from 'react';

/**
 * Hook that returns resource data from cache or fetches it from an URL.
 * 
 * @param {string} url URL of the resource that should be fetched
 * @param {Function} reducer Reducer function. Implement at least the FETCH (payload = data) and ERROR (payload = error string) actions.
 * @param {object} initialState Initial state.
 * @param {Function} cacheFunc Async function that returns the cached resource (only if this turns out to be null, a fetch is done)
 * @param {string} key A string that will be attached to the dispatched actions, can be used to store the data in a cache.
 */
export default function useFetch(url, reducer, initialState, cacheFunc, key) {

    const [state, dispatch] = useReducer(reducer, initialState);
    const hasData = useRef(false);

    useEffect(function () {

        if (hasData.current) return;

        (async function () {
            try {

                const cache = await cacheFunc();
                if (cache) {
                    hasData.current = true;
                    dispatch({
                        type: "FETCH",
                        payload: cache,
                        key
                    });
                    return;
                }

                const response = await fetch(url);
                if (!response.ok) {
                    throw Error("Response is not ok");
                }
                hasData.current = true;
                const json = await response.json();
                dispatch({
                    type: "FETCH",
                    payload: json,
                    key
                });
            } catch (err) {
                dispatch({
                    type: "ERROR",
                    payload: err,
                    key
                });
            }
        }());

    }, [url, cacheFunc, key]);

    return [state, dispatch];

}

// We could use useRef({}) for the cache if we no for certain that the components
// that are using this hook don't get unmounted. This will however happen when you
// use React Router, which causes the useRef to be re created each mount.
const _cache = {};

export function useSimpleFetch(key) {
    
    const [data, _setData] = useState((key in _cache) ? _cache[key] : null);
    const [error, setError] = useState(null);
    
    function setData(data) {
        _cache[key] = data;
        _setData(data);
    }
    
    useEffect(function() {

        if (data) {
            return;
        }

        (async function() {
            try {
                const response = await fetch(key);
                if (!response.ok) {
                    throw Error("Response is not ok");
                }
                const json = await response.json();
                _cache[key] = json;
                _setData(json);
            } catch (err) {
                setError(err);
            }
        }());

    }, [key, data]);

    return [ data, setData, error ];

}