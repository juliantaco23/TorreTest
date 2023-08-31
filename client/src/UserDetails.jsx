import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./styles/UserDetails.css"; // Importa los estilos de UserDetails.css

const UserProfile = () => {
  const { username } = useParams();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetch(`/user/${username}`)
      .then((response) => response.json())
      .then((data) => {
        setUserData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [username]);

  if (!userData) {
    return <p>Loading user data...</p>;
  }

  return (
    <div className="user-profile-container">
      <div className="user-card">
        <div className="text-center">
          <img
            src={userData.person.pictureThumbnail}
            alt={userData.person.name}
            className="mx-auto w-20 h-20 rounded-full mb-4"
          />
          <h2 className="text-xl font-semibold mb-2">{userData.person.name}</h2>
          <p className="text-gray-600">{userData.person.professionalHeadline}</p>
        </div>
        <div className="mt-6">
          <p className="text-gray-700">{userData.person.summaryOfBio}</p>
        </div>
        <div className="mt-6 text-center">
          <a
            href={`https://torre.ai/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-yellow-400 text-white py-2 px-4 rounded-md shadow-md hover:bg-yellow-500 transition-colors duration-300"
          >
            Check user genome
          </a>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
