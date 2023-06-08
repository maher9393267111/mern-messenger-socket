const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const authenticate = require("../middleware/authenticate");
const User = require("../model/user");
require("dotenv").config();
const newToken = (user) => {
  const token = jwt.sign({ user }, '121245');
  return token;
};


//search
router.get("/", authenticate, async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          //{ name: { $regex: req.query.search, $options: "i" } },
         // { email: { $regex: req.query.search, $options: "i" } },
         { username: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
});



// // :Name search---

// router.get("/Users/:username", authenticate, async (req, res) => {
//  // console.log('SEARCH' , req.params.username)
//   const keyword = req.params.username
//     ? {
//         $or: [
//           // { name: { $regex: req.params.username, $options: "i" } },
//           // { email: { $regex: req.params.username, $options: "i" } },
//           { username: { $regex: req.params.username, $options: "i" } },
//           { displayName: { $regex: req.params.username, $options: "i" } },
//         ],
//       }
//     : {};

//   const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
//   res.send(users);
// });



// -------/ current user----


router.get("/Users/:username", authenticate, async (req, res) => {
 
  try {

if(req.params.username !== req.user.username)

{


  res.status(405).json({message:'you are not authorized'})

}


   //// console.log('---------->',req.user);
    const user = await User.findById(req.user._id).select("-password").exec();
  //  console.log("CURRENT_USER", user);
    return res.json(user);
  } catch (err) {
    console.log(err);
  }

});








// ---register----

router.post("/Users", async (req, res) => {
  try {
    let user = await User.create(req.body);
    let token = newToken(user);
    return res.status(200).send({ user, token ,message:'OK' });
  } catch (err) {
   // console.log( 'REGISTER ERRPR',err.message);
    return res.status(500).send(err.message);
  }
});







router.delete("/", authenticate, async (req, res) => {
  try {
    let user = await User.findByIdAndDelete(req.params.id).lean().exec();
    // let user = await User.deleteMany({}).lean().exec();
    return res.status(200).send(user);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});



// -----Login ----


router.post("/Tokens", async (req, res) => {
  try {
   // let user = await User.findOne({ email: req.body.email });
   let user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(400).send("user not exist");
    let match = user.checkPassword(req.body.password);
    if (!match) return res.status(400).send("password is wrong");
    let token = newToken(user);
    return res.status(200).send({ user, token });
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

module.exports = router;
