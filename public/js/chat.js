const socket=io('/');

async function loadMsgs(){

   const allMsgs=await axios.get('/allmessages');
   console.log(allMsgs)

   for(let msg of allMsgs.data){
       
       $("#all-msg-container").append(`<li>
       <span>${msg.user}</span>
       <span>${msg.createdAt}</span>
       <p>${msg.content}</p></li>`)
   }

}

loadMsgs();

$('#send-msg-btn').click((e)=>{

    const textMsg=$('#msg-text').val();

    socket.emit('send-msg',{
        username:currentUser,
        msg:textMsg,

    });

    console.log(textMsg)
    $('#msg-text').val('');
})
console.log(currentUser)

socket.on('received-msg',(data)=>{

    $('#all-msg-container').append(`<li><span>${data.user} says</span><span>${data.createdAt}</span> <p>${data.msg}</p></li>`)

})