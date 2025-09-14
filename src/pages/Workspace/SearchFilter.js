import React, { useEffect, useState } from "react";

const SearchFilter = ({ workspaces, onFilter }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [filterName, setFilterName] = useState("");
  const [filterLocation, setFilterLocation] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterCapacity, setFilterCapacity] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const uniqueNames = [...new Set(workspaces.map((ws) => ws.name))];
  const uniqueLocations = [...new Set(workspaces.map((ws) => ws.location))];
  const uniqueTypes = [...new Set(workspaces.map((ws) => ws.type))];
  const uniqueCapacities = [...new Set(workspaces.map((ws) => ws.capacity))];

  useEffect(() => {
    const filtered = workspaces.filter((ws) => {
      const matchesSearch =
        debouncedSearchTerm === "" ||
        ws.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase());

      const matchesName = filterName === "" || ws.name === filterName;
      const matchesLocation = filterLocation === "" || ws.location === filterLocation;
      const matchesType = filterType === "" || ws.type === filterType;
      const matchesCapacity =
        filterCapacity === "" || ws.capacity.toString() === filterCapacity;

      return matchesSearch && matchesName && matchesLocation && matchesType && matchesCapacity;
    });

    onFilter(filtered);
  }, [debouncedSearchTerm, filterName, filterLocation, filterType, filterCapacity, workspaces, onFilter]);

  const resetFilters = () => {
    setSearchTerm("");
    setFilterName("");
    setFilterLocation("");
    setFilterType("");
    setFilterCapacity("");
    onFilter(workspaces); 
  };

  return (
    <div className="search-filter-wrapper">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search workspaces by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={resetFilters}>Reset Filters</button>
      </div>

      <div className="filters">
        <select value={filterName} onChange={(e) => setFilterName(e.target.value)}>
          <option value="">All Names</option>
          {uniqueNames.map((name) => (
            <option key={name} value={name}>{name}</option>
          ))}
        </select>

        <select value={filterLocation} onChange={(e) => setFilterLocation(e.target.value)}>
          <option value="">All Locations</option>
          {uniqueLocations.map((loc) => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>

        <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          <option value="">All Types</option>
          {uniqueTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>

        <select value={filterCapacity} onChange={(e) => setFilterCapacity(e.target.value)}>
          <option value="">All Capacities</option>
          {uniqueCapacities.map((cap) => (
            <option key={cap} value={cap}>{cap}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SearchFilter;