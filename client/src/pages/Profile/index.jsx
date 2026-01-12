import { useState, useEffect } from "react";

const url = import.meta.env.VITE_API_URL;

function Profile() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`${url}/user/profile`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }

        const { user } = await response.json();
        setProfile({
          name: user.name,
          email: user.email,
        });
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div>
      <p>{profile.name}</p>
      <p>{profile.email}</p>
    </div>
  );
}

export default Profile;
