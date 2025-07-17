import { useEffect } from "react";

function Search({ search, setSearch, setNewList, contacts }) {
  useEffect(() => {
    if (search) {
      const list = contacts.filter((i) =>
        i.name.includes(search)
      );
      setNewList(list);
    } else {
      setNewList(contacts);
    }
  }, [search, contacts]);

  const SearchData = (e) => {
    setSearch(e.target.value);
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
