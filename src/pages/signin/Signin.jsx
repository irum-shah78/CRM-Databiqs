// import React, { useState } from "react";
// import { useGoogleLogin } from "@react-oauth/google";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const SignIn = ({ setUser }) => {
//   const [error, setError] = useState(null);
//   const [email, setEmail] = useState("");
//   const navigate = useNavigate();

//   const handleSignIn = async () => {
//     if (!email) {
//       setError("Email is required for regular sign-in");
//       return;
//     }

//     try {
//       const response = await axios.get(`http://localhost:8000/users/${email}/`);
//       console.log("Regular Sign-In Response:", response.data);
//       setUser(response.data);
//       navigate("/");
//     } catch (err) {
//       console.error("Regular Sign-In Error:", err.response);
//       setError(err.response?.data?.detail || "Error occurred during sign-in");
//     }
//   };

//   const googleLogin = useGoogleLogin({
//     onSuccess: async (tokenResponse) => {
//       try {
//         console.log("Google Login Token Response:", tokenResponse);

//         const idToken = tokenResponse?.idToken;

//         if (idToken) {
//           console.log("Google id_token:", idToken);

//           const response = await axios.post("http://localhost:8000/auth/google", {
//             token: idToken,
//           });

//           console.log("Backend Response:", response.data);
//           setUser(response.data.user);
//           navigate("/");
//         } else {
//           console.error("Failed to retrieve id_token from Google.");
//           setError("Failed to retrieve id_token from Google");
//         }
//       } catch (err) {
//         console.error("Google Sign-In Error:", err.response);
//         const errorDetail = err.response?.data?.detail;
//         setError(errorDetail || "Error occurred during Google sign-in");
//       }
//     },
//     onError: (error) => {
//       console.error("Google Sign-In Error:", error);
//       setError("Error occurred during Google sign-in");
//     },
//     scope: "openid profile email",
//   });

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
//         <div className="mb-4">
//           <input
//             type="email"
//             placeholder="Email"
//             className="w-full p-2 border border-gray-300 rounded-md"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </div>
//         <button
//           className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition duration-200"
//           onClick={handleSignIn}
//         >
//           Sign In with Email
//         </button>
//         <button
//           className="w-full bg-gray-400 text-white font-bold py-2 px-4 rounded-md transition duration-200 mt-4"
//           onClick={googleLogin}
//         >
//           Sign In with Google
//         </button>

//         {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
//       </div>
//     </div>
//   );
// };

// export default SignIn;

import React, { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignIn = ({ setUser }) => {
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async () => {
    if (!email) {
      setError("Email is required for regular sign-in");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:8000/users/${email}/`);
      console.log("Regular Sign-In Response:", response.data);
      setUser(response.data);
      navigate("/");
    } catch (err) {
      console.error("Regular Sign-In Error:", err.response);
      setError(err.response?.data?.detail || "Error occurred during sign-in");
    }
  };

  // const googleLogin = useGoogleLogin({
  //   onSuccess: async (tokenResponse) => {
  //     try {
  //       console.log("Google Login Token Response:", tokenResponse);

  //       const accessToken = tokenResponse.access_token;
  //       const userInfo = await axios.get(
  //         `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`
  //       );

  //       const idToken = userInfo.data.sub;
  //       if (idToken) {
  //         console.log("Google id_token:", idToken);

  //         const response = await axios.post("http://localhost:8000/auth/google", {
  //           token: idToken,
  //         });

  //         console.log("Backend Response:", response.data);
  //         setUser(response.data.user);
  //         navigate("/");
  //       } else {
  //         console.error("Failed to retrieve id_token from Google.");
  //         setError("Failed to retrieve id_token from Google");
  //       }
  //     } catch (err) {
  //       console.error("Google Sign-In Error:", err.response);
  //       const errorDetail = err.response?.data?.detail;
  //       setError(errorDetail || "Error occurred during Google sign-in");
  //     }
  //   },
  //   onError: (error) => {
  //     console.error("Google Sign-In Error:", error);
  //     setError("Error occurred during Google sign-in");
  //   },
  //   scope: "openid profile email",
  // });

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        console.log("Google Login Token Response:", tokenResponse);

        const idToken = tokenResponse.id_token; // This is the correct id_token

        if (idToken) {
          console.log("Google id_token:", idToken);

          const response = await axios.post(
            "http://localhost:8000/auth/google",
            {
              token: idToken,
            }
          );

          console.log("Backend Response:", response.data);
          setUser(response.data.user);
          navigate("/");
        } else {
          console.error("Failed to retrieve id_token from Google.");
          setError("Failed to retrieve id_token from Google");
        }
      } catch (err) {
        console.error("Google Sign-In Error:", err.response);
        const errorDetail = err.response?.data?.detail;
        setError(errorDetail || "Error occurred during Google sign-in");
      }
    },
    onError: (error) => {
      console.error("Google Sign-In Error:", error);
      setError("Error occurred during Google sign-in");
    },
    scope: "openid profile email",
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition duration-200"
          onClick={handleSignIn}
        >
          Sign In with Email
        </button>
        <button
          className="w-full bg-gray-400 text-white font-bold py-2 px-4 rounded-md transition duration-200 mt-4"
          onClick={googleLogin}
        >
          Sign In with Google
        </button>

        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default SignIn;
