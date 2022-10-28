import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { validateLoginForm } from "../../shared/utils/validators";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFormvalid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(validateLoginForm({ email, password }));
  }, [setIsFormValid, email, password]);

  const submitHandler = () => {
    console.log(email);
    console.log(password);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-800">
      <div className="w-2/6 py-5 bg-gray-900 text-white px-5 rounded-md">
        <h1 className="text-xl font-bold">Welcome Back!</h1>
        <p className="font-medium my-2">We are happy that you are with us!</p>
        <form onSubmit={submitHandler}>
          <div className="space-y-5">
            <div className="">
              <label htmlFor="input-email">Email</label>
              <input
                type="email"
                id="input-email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email address"
                className="block p-2 w-full text-gray-400 bg-gray-900 rounded-md border border-gray-600 sm:text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
              />
            </div>
            <div className="">
              <label htmlFor="input-password">Password</label>
              <input
                type="password"
                id="input-password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="block p-2 w-full text-gray-400 bg-gray-900 rounded-md border border-gray-600 sm:text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
              />
            </div>
          </div>
          {isFormvalid ? (
            <button className="block bg-sky-500 w-full hover:bg-sky-400 mt-10 py-2 rounded-md">
              Log in
            </button>
          ) : (
            <button
              disabled
              className="block bg-gray-800 w-full mt-10 py-2 rounded-md opacity-30"
            >
              Log in
            </button>
          )}
        </form>
        <p className="text-gray-400 text-sm">
          Need an account?
          <Link to="/register" className="text-blue-500">
            Create an account!
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
