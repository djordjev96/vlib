import React from 'react';

const SearchBook = ({searchInput, onSearchInputChange}) => {
        return (
            <form>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchInput}
                    onChange={(e) => onSearchInputChange(e.target.value)}
                />
            </form>
        );
}

export { SearchBook as default };
