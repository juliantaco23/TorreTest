import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const UserProfile = () => {
    console.log(useParams());
    const { username } = useParams();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        fetch(`/user/${username}`) // Cambia la URL para usar la ruta del servidor proxy
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
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
    <div>
      <h2>User Profile</h2>
      <p>Name: {userData.person.name}</p>
      <p>Professional Headline: {userData.person.professionalHeadline}</p>
    </div>
  );
};

export default UserProfile;
