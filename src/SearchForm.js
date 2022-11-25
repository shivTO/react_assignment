import React, { useState } from "react";
import { Stack } from '@mui/material';
function SearchForm(props) {
  const [searchText, setSearchText] = useState("");
  const onSearchChange = (e) => {
    // Update state
    setSearchText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSearch(searchText);
    e.currentTarget.reset();
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <Stack direction="row" spacing={15}>
      <label className="is-hidden" htmlFor="search">
        Search
      </label>
      <input
        type="search"
        onChange={onSearchChange}
        name="search"
        placeholder="Search..."
      />
      <button type="submit" id="submit" className="search-button">
        <i className="material-icons icn-search" style={{fontSize:"20px"  , blockSize: "100px" ,color: "white", backgroundColor:"black"}}>Search</i>
      </button>
      </Stack>
    </form>
  );
}

export default SearchForm;
