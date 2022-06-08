const socket = io('http://localhost:8000')//opening websocket connection
const sendbox = document.getElementById("container")
const btn = document.getElementById("sendbtn")
const messageInput = document.getElementById("inputarea")
const username = prompt("Enter your name to enter chat room...")


//user join

const append =(message,position)=>{
    const messageElement = document.createElement('div')
    messageElement.innerText= message
    messageElement.classList.add('message')
    messageElement.classList.add(position)
    sendbox.append(messageElement)
}

const sumbitt=(event)=>{
    console.log("button clicked");
    event.preventDefault();
    message =messageInput.value
    append(`You ${message}`,"right")
    socket.emit("send",message)
    messageInput.value = " "
}

socket.emit("new-user-joined",username)

socket.on("user-joined",name=>{
    append(`${name} joined the chat`,`right`)

})
 
socket.on('recieve',data=>{
    append(`${data.name}:${data.message}`,"left")
    sendbox.scrollTop = sendbox.scrollHeight;
})

socket.on('left',user=>{
    append(`${user} left the chat`,'middle')
})