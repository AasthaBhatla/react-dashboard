// src/components/SearchBar.js
function SearchBar({ search, setSearch }) {
  return (
    <input
      type="text"
      placeholder="Search users"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="p-2 border w-full mb-2"
    />
  );
}

export default SearchBar;
