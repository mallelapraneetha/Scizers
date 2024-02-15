import React from 'react';

const UserCard = ({ user }) => {
  const randomImage = `https://picsum.photos/200/300?random=${user.name}`;
  const cardStyle = {
    backgroundColor: user.hair_color,
  };

  return (
    <div className="user-card" style={cardStyle}>
      <img src={randomImage} alt={user.name} />
      <div className="user-details">
        <h2>{user.name}</h2>
        <p>Hair Color: {user.hair_color}</p>
        <p>Skin Color: {user.skin_color}</p>
        <p>Gender: {user.gender}</p>
        <p>Vehicles Count: {user.vehicles.length}</p>
      </div>
    </div>
  );
};

export default UserCard;
