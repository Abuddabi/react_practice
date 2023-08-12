import React, { useState, useEffect, useRef } from "react";

import Card from "../UI/Card";
import "./Search.css";

const Search = React.memo(({ onFilter }) => {
    const [filterValue, setFilterValue] = useState("");
    const inputRef = useRef();

    useEffect(() => {
        const timer = setTimeout(() => {
            if (filterValue !== inputRef.current.value) return;
            onFilter(filterValue);
        }, 500);

        return () => clearTimeout(timer);
    }, [filterValue, onFilter, inputRef]);

    return (
        <section className="search">
            <Card>
                <div className="search-input">
                    <label>Filter by Title</label>
                    <input
                        type="text"
                        value={filterValue}
                        ref={inputRef}
                        onChange={(e) => setFilterValue(e.target.value)}
                    />
                </div>
            </Card>
        </section>
    );
});

export default Search;
