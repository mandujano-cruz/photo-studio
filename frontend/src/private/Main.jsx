import { useEffect, useState } from "react";
import { getUserInfo } from "../utils/auth";
import * as tok from '../utils/token';
import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

export default function Main () {
  const { currentUser } = useContext(CurrentUserContext);

  console.log(currentUser)
  // const [user, setUser] = useState("");
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState("");

  // useEffect(() => {
  //   const token = tok.getToken();
  //   getUserInfo(token)
  //     .then(data => setUser(data))
  //     .catch(err => console.error(err))
  //     .finally(setLoading(false));
  // }, []);

  return (
    <>
      <h2 className="dashboard__text">¡Bienvenido {currentUser.full_name}!</h2>
    </>
  );
}