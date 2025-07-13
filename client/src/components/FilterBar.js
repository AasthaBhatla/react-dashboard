function FilterBar({ filter, setFilter }) {
  return (
    <select className="p-2 border mb-4" value={filter} onChange={e => setFilter(e.target.value)}>
      <option value="all">All</option>
      <option value="admin">Admin</option>
      <option value="user">User</option>
    </select>
  );
}

export default FilterBar;
