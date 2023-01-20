import React, {useState, useEffect, useRef } from 'react';
import ItemSender from './ItemSender';
import ItemReceiver from './ItemReceiver';
import io from 'socket.io-client';
import Example from './Example';


const App = () => {
    const socket = io('http://localhost:5000/');
    const [chatList, setChatList] = useState([]);
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const botRef = useRef('');

    const sendMessage = (e) => {
        e.preventDefault();
        if(name.trim() && message.trim()){
            const obj = { n: name, m: message };
            socket.emit('message_send', JSON.stringify(obj));
            setMessage('');
        }else{
            alert('name or message is empty');
        }
    }

    useEffect(() => {
        socket.on('message_receive', (obj) => {
            const o = JSON.parse(obj);
            setChatList([...chatList, {...o}]);
            let myTimer;
            const scrolltoBottom = () => {
              botRef.current?.scrollIntoView({behavior: 'smooth'});
              clearTimeout(myTimer);
            }
              myTimer = setTimeout(scrolltoBottom, 100);
        });
    });

  return (
    <div className='app'>
        <Example/>
        <div className="container">
            <div className="chats">
                {
                    chatList.map((obj, index) => {
                        if(obj.n === name){
                            return <ItemSender key={index} name={obj.n} message={obj.m}/>
                        }else{
                            return <ItemReceiver key={index} name={obj.n} message={obj.m}/>
                        }
                    })
                }
                <div ref={botRef}></div>
            </div>
           <form onSubmit={sendMessage} className="message_box">
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder='name' className='name' type="text" />
                <input value={message} onChange={(e) => setMessage(e.target.value)} placeholder='type here...' className='message' type="text" />
                <button type='submit' className='btn_send'>Send</button>
           </form>
        </div>
    </div>
  )
}

export default App