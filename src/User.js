import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";

function User() {
  const [user, setUser] = useState([]);
  const [dataPage, setDataPage] = useState(0);
  const pageCounts = 3;

  useEffect(() => {
    const url = `https:reqres.in/api/users?page=${dataPage}`;

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setUser(json.data);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, [dataPage]);

  const changePage = ({ selected }) => {
    setDataPage(selected);
  };
  return (
    <div className="allUserDiv">
      {/* <h1>User Info</h1> */}
      {user.map((userinfo) => {
        return (
          <div key={userinfo.id}>
            <img src={userinfo.avatar} alt="userImage" />
            <h3>{userinfo.first_name}</h3>
            <p>{userinfo.email}</p>
          </div>
        );
      })}
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCounts}
        onPageChange={changePage}
        containerClassName={"paginationContainer"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"disabledBttn"}
        activeClassName={"activeBttn"}
      />
    </div>
  );
}

export default User;
