import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";

interface ProfileProps {
    collapsed?: boolean;
}

const Profile: React.FC<ProfileProps> = ({collapsed}) => {
  const [profilePic, setProfilePic] = useState<string>("");
  const [name, setName] = useState<string>("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in
        const { displayName, photoURL } = user;
        setProfilePic(photoURL || "");
        setName(displayName || "");
      } else {
        // User is signed out, reset the profile data
        setProfilePic("");
        setName("");
      }
    });

    // Clean up the subscription
    return () => unsubscribe();
  }, []);

  return (
    <div className="profile">
      <img src={profilePic} alt="Profile" className="profile-pic" />
          {!collapsed ? (<span className="profile-name">{name}</span> ): ""}
    </div>
  );
};

export default Profile;
