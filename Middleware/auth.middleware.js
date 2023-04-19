const { loggedInUser } = require("../controller/userController");

async function authLoginUser(req, res, next) {
  try {
    const brearHeader = req.headers["authorization"];
    if (typeof brearHeader !== "undefined") {
      const [prefix, token] = brearHeader.split(" ");
      const verification = await loggedInUser(token);
      req.verification = verification;
      next();
    } else {
      return res.status(500).send({
        error: "Something went wrong",
      });
    }
  } catch (e) {
    return res.status(500).send({
      error: "Something went wrong",
    });
  }
}
module.exports = authLoginUser;

// const user = JSON.parse(localStorage.getItem("userDetail")) || [];
//     const loging = useGoogleLogin({
//       onSuccess: async (response) => {
//           try {
//               const Userdata = await axios.get(
//                   "https://www.googleapis.com/oauth2/v3/userinfo",
//                   {
//                       headers: {
//                           Authorization: `Bearer ${response.access_token}`,
//                       },
//                   }
//               );
//               let data=Userdata.data;
//                 let thdata={"name":data.name,
//             "email":data.email,
//         "picture":data.picture
//     }
//     console.log(thdata)
//                let res= await fetch('http://localhost:3001/googlelogin',{
//                 method: 'POST',
//                 headers:{
//                     "content-type": "application/json",
//                 },
//                 body:JSON.stringify(thdata)
//                })
//                let json=await res.json();
//                console.log(json)
//                 // user.push(Userdata.data)
//                 localStorage.setItem("userDetail", JSON.stringify(json))
//                 // dispatch({
//                 //     type: "LOGIN_SUCCESS",
//                 //     payload: Userdata.data
//                 // })
//                 console.log(Userdata.data);
//           } catch {
//               console.log("error");
//           }
//       },
//   });
