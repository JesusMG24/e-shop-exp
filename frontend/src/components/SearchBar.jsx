import { useState, useEffect } from "react";
import api from "../api";

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (query.trim()) {
                api.get(`/components/search/?q=${query}`)
                    .then(res => setResults(res.data))
                    .catch(err => console.error('Search error:', err));
            } else {
                setResults([]);
            }
        }, 300);

        return () => clearTimeout(delayDebounce);
    }, [query]);

    return (
        <div className="flex flex-col fixed z-50 w-[800px] left-1/2 -translate-x-1/2 top-[82px] bg-gray-800 rounded-[15px] overflow-hidden">
            <input type="text" placeholder="Search components..." className="h-[30px] rounded-full w-full pl-[20px] focus:outline-none focus:bg-gray-700" value={query} onChange={e => setQuery(e.target.value)}>
            </input>
            <ul className="max-h-[800px] overflow-y-auto">
                {results.map(component => (
                    <li key={component.id} className="flex items-center justify-around w-full h-[200px]">
                        <strong className="w-[500px]">{component.name}</strong>
                        <figure className="w-[150px] h-[150px] bg-white rounded-full overflow-hidden flex">
                            <img src={component.image_url} className="max-w-full max-h-full object-contain"></img>
                        </figure>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchBar;