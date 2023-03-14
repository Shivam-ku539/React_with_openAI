import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [input1, setInput] = useState('');
  // console.log(input)
  // console.log(setInput)
  const[prevchat,setPrevchat]=useState('');
  const [response, setResponse] = useState('');

  
  // let prev=[];
  // prev=input;
  // console.log(prev)
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Call Flask API to get chatbot response
      let obj=[prevchat+ ""+input1]
      // let obj=[prevchat]
      
      const res = await axios.post('http://localhost:5000/chatbot', {obj});
      
      // Update state with chatbot response
      setResponse(res.data.response);
      setInput('')
    } catch (err) {
      console.error(err);
    }
  };

  const manageChat=()=>{
    setPrevchat(prevchat +" " + input1)
    // setPrevchat(response+" "+input1)
    console.log(prevchat)
  }

  const newChat=()=>{
    window.location.reload()
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label style={{"color":"green","fontSize":"40px"}}>
        Write any question
        <br/>
        <button onClick={newChat} style={{"backgroundColor":"red","width":"90px","height":"30px","color":"blue"}}>New Chat</button><br/>
          <input style={{"width":"300px","height":"30px","fontSize":"20px"}} type="text" value={input1} onChange={(event) =>setInput(event.target.value)}  />
        </label>
         <br/><br/>
        <button onClick={manageChat} style={{"backgroundColor":"orange","width":"90px","height":"30px","color":"blue"}} type="submit">Search</button>
        <p style={{"border":"2px solid grey"}}>Note:(Continue here for contextual chat and to start over Click "New Chat")</p>
      </form>
      <p>Response: {response}</p>
    </div>
  );
}

export default App;
