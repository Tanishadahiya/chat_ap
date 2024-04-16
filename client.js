const socket=io('http://localhost:8000');

const form=document.getElementById('send=container');
const messageInput=document.getElementById('messageInp')
const messagecontainer=document.querySelector(".container")

var audio= new Audio('ting.mp3');

const append =(message,poistion)=>{
    const messageElement=document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messagecontainer.append(messageElement);
    if(poistion=='left'){
        audio.play();

    }
    
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=messageInput.value;
    append("you: ${message}",'right');
    socket.emit('send',message);
    messageInput.value=''
})

const name=prompt("enter your name to join");
socket.emit('new-user-joined', name);

socket.on('user-joined',name=>{
    append('${name} joined the chat','right')

})

socket.on('receive',name=>{
    append('${data.name}: ${data.message}','left')

})

socket.on('left',name=>{
    append('${data.name} left the chat','left')
})
