const express = require("express");
const authenticate = require("../middleware/authenticate");
const Chat = require("../model/chat");
const user = require("../model/user");
const Message = require("../model/messages");
const router = express.Router();


// router.param('chatId', function( req, res, next,chatId ) {
//   req.id_from_param = chatId;
//   console.log('CHATID 🚛🏍🚛🏍🚛🏍🚛🏍' ,chatId)
//   next();
// });


//router.param('chatId', userById);





// ------get current user chats -----
router.get("/", authenticate, async (req, res) => {
  try {
    let chat = await Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate("users", "-password")
     // .populate( "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await user.populate(results, {
          path: "latestMessage.sender",
          select: "username profilePic ",
        });
        res.status(200).send(results);
      });
  } catch (error) {
    return res.status(400).send(error.message);
  }
});





// r.get("/new", function( req, res ) {
// res.send('some new');
// });





// -------delete chat---


router.delete("/:chatId", authenticate, async (req, res) => {
  try {
    let chat = await Chat.findByIdAndDelete(req.params.chatId).lean().exec();
    // let user = await User.deleteMany({}).lean().exec();
    return res.status(200).send('chat Deleted Successfully');
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

















// ----new chat start----     

router.post("/", authenticate, async (req, res) => {
  try {
    const { userId } = req.body;
    let chat = await Chat.find({
    //  isGroupChat: false,
      $and: [
        {
          users: { $elemMatch: { $eq: req.user._id } },
        },
        {
          users: { $elemMatch: { $eq: userId } },
        },
      ],
    })
      .populate("users", "-password")
      .populate("latestMessage");
    chat = await user.populate(chat[0], {
      path: "latestMessage.sender",
      select: "name profilePic email",
    });
    if (chat != undefined) {
      return res.status(200).send(chat);
    } else {
      var chatData = {
        chatName: "sender",
       // isGroupChat: false,
        users: [req.user._id, userId],
      };

      try {
        const createdChat = await Chat.create(chatData);
        const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
          "users",
          "-password"
        );
        return res.status(200).send(FullChat);
      } catch (error) {
        return res.status(400).send(error.message);
      }
    }
  } catch (error) {
    return res.status(400).send(error.message);
  }
});








//Get All chat Messages

router.get("/:chatId/messages", authenticate, async (req, res) => {

  console.log('params 🌙🌚🌡⏳⌛🌙🌚🌡⏳⌛' ,  req.params.chatId)

  try {
    const messages = await Message.find({ chat: 
      req.params.chatId
  
    
    })
      .populate("sender", "username profilePic email")
      .populate("chat")
      .lean()
      .exec();
    return res.status(200).send(
       messages
      
      
      );
  } 
  
  
  catch (error) {
    return res.status(400).send(error.messages);
  }
});










//Post create new message in chat
router.post("/:chatid/messages", authenticate, async (req, res) => {
  //req.params.chatId
  const { content, chatId } = req.body;
  if (!content || !chatId) {
    return res.status(400).send("Invalid data passed into request");
  }

  var newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };
  try {
    var message = await Message.create(newMessage);
    message = Message.findOne({ _id: message._id })
      .populate("sender", "username profilePic")
      .populate("chat")
      .lean()
      .exec();
    message = await user.populate(message, {
      path: "chat.users",
      select: "username profilePic ",
    });

    let data = await Chat.findByIdAndUpdate(req.body.chatId, {
      latestMessage: message._id,
    });

    return res.status(200).send(message);
  } catch (error) {
    res.status(400).send(error.message);
  }
});


















module.exports = router;
