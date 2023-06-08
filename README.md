# Messanger
A Chatting app build on React and Redux with socket.io for real time chatting as MERN project you can make a Login and sigup authenicate with bcrypt and json web token live socket single chat group chat sending notification , profile upload and awesome UI/UX storing the chat on mongoDB complete schema using Mongoose


## ENDPOINTS 

### USER ENDPOINTS

1- Register new user   POST   http://localhost:5000/Users  
2- Login user         POST   http://localhost:5000/Tokens
3- Current user  GET   http://localhost:5000/api/Users/{username}
4- get All Contacts in chat   GET  http://localhost:5000/api
5-  search user by username   GET  http://localhost:5000/api/?search={search}



### CHAT  ENDPOINTS

1- Get current user All Chats      GET   http://localhost:5000/api/chats
2- Delete Chat by id     GET   http://localhost:5000/chats/api/chatId
3- Create new chat        POST  http://localhost:5000/api/chats


###  MESSAGES ENDPOINTS


1- Get all chat messages    GET   http://localhost:5000/api/chats/:chatId/messages
2- Create new message in chat     POST  http://localhost:5000/api/chats/:chatId/messages


# mern-messenger-socket
# mern-messenger-socket
# mern-messenger-socket




##  Server work   

 # cd /Server  then
 # npm run dev

# http://localhost:5000


 ##  Client work

 # cd Client then
 # npm run dev

 # http://localhost:300