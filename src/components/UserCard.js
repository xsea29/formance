import { useEffect, useState } from "react";
import "./UserCard.css";
import mailIcon from "../images/mail-icon.png";

export default function UserCard({ user, onClick }) {
  const [imageUrl, setImageUrl] = useState("");

  const API_URL = "https://randomuser.me/api/";

  useEffect(() => {
    async function fetchRandomImg() {
      const res = await fetch(API_URL);
      const data = await res.json();

      setImageUrl(data.results[0].picture.large);
    }

    fetchRandomImg();
  }, []);

  function calculateAge(dob) {
    const birthDate = new Date(dob);
    const currentDate = new Date();

    let age = currentDate.getFullYear() - birthDate.getFullYear();
    const monthDifference = currentDate.getMonth() - birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && currentDate.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  }

  return (
    <div className="overlay">
      <div className="user-card">
        <div className="user">
          <div className="user-img">
            <img src={imageUrl} alt="user" />
          </div>
          <div className="detail">
            <h2>{user?.name}</h2>
            <div className="add-details">
              <span className="age">{calculateAge(user.dob)}yrs</span>
              <span className="email">
                <img src={mailIcon} alt="mail-icon" /> {user?.email}
              </span>
            </div>
          </div>
        </div>
        <button className="back-btn" onClick={onClick}>
          Go back
        </button>
      </div>
    </div>
  );
}
