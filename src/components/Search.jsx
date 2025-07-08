function Search({ search, setSearch, setNewList, contacts }) {
  const SearchData = (e) => {
    const value = e.target.value;
    setSearch(value);
    if (value) {
      const list = contacts.filter((i) => i.name.includes(value));
      return setNewList(list);
    } else {
      console.log(contacts);
      return setNewList(contacts);
    }
  };

  return (
    <>
      <input
        type="text"
        placeholder="search..."
        style={{
          border: "none",
          width: "30%",
          height: "2rem",
          backgroundColor: "#f5f4f4",
          borderRadius: "10px",
          marginBottom: "2px",
        }}
        onChange={SearchData}
        value={search}
      />
    </>
  );
}

export default Search;
