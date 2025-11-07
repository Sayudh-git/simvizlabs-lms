import { SignIn } from "@clerk/nextjs";
const SignInPage = async () => {


  return (
    <div className="flex justify-center items-center h-screen align-middle bg-gray-100">
      <SignIn />
    </div>
  );
};
export default SignInPage;
