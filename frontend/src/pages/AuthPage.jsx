import { useRecoilValue } from "recoil";
import LoginCard from "../components/LoginCard";
import authScreenAtom from "../atoms/authAtom";
import SignupCard from "../components/SignupCard";

const AuthPage = () => {
  const authScreenState = useRecoilValue(authScreenAtom); // returns "login" or "signup"
  console.log(authScreenState);

  return (
    <>
      {authScreenState === "login" ? <LoginCard /> : <SignupCard />}
      {/* if authScreenState is "login", render LoginCard component, otherwise render SignupCard */}
    </>
  );
};

export default AuthPage;
