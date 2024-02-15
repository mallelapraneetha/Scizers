import React, { useState, useEffect } from 'react';
import UserCard from './UserCard';
import Pagination from './Pagination';
import Loader from './Loader';
import Error from './Error';
import SearchBar from './SearchBar';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://swapi.dev/api/people/?page=${currentPage}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setUsers(data.results);
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    };

    fetchUsers();
  }, [currentPage]);

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="user-list">
      <h1> Users</h1>
      <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
      {loading && <Loader />}
      {error && <Error message={error} />}
      {filteredUsers.map((user) => (
        <UserCard key={user.name} user={user} />
      ))}
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(users.length / 10)} // Assuming 10 users per page
        onPageChange={handleChangePage}
      />
    </div>
  );
};

export default UserList;
