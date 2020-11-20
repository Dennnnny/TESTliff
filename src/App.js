import logo from './logo.svg';
import liff from "@line/liff"
import './App.css';

function App() {
  console.log(process.env.REACT_APP_LIFF)
  const sendMessage = () => {
    liff.init({liffId: process.env.REACT_APP_LIFF}) // LIFF IDをセットする
      .then(() => {
        if (!liff.isLoggedIn()) {
          liff.login({}) // ログインしていなければ最初にログインする
        } else if (liff.isInClient()) { // LIFFので動いているのであれば
          alert("here")
          liff.sendMessages([{ // メッセージを送信する
            'type': 'text',
            'text': "You've successfully sent a message! Hooray!"
          }]).then(function() {
            window.alert('Message sent');
          }).catch(function(error) {
            window.alert('Error sending message: ' + error);
          });
        }
      })
  }

  const getUserInfo = () => {
    liff.init({liffId: process.env.REACT_APP_LIFF})
      .then(() => {
        if (!liff.isLoggedIn()) {
          liff.login({}) // ログインしていなければ最初にログインする
        } else if (liff.isInClient()) {
          liff.getProfile()  // ユーザ情報を取得する
            .then(profile => {
              const userId = profile.userId
              const displayName = profile.displayName
              alert(`Name: ${displayName}, userId: ${userId}`)
            }).catch(function(error) {
              window.alert('Error sending message: ' + error);
            });
        }
      })
  }

  const scanner = () => {
    liff.init({liffId: process.env.REACT_APP_LIFF})
      .then(() => {
        if (!liff.isLoggedIn()) {
          liff.login({}) // ログインしていなければ最初にログインする
        } else if (liff.isInClient()) {
          if(liff.scanCode){
            liff.scanCode().then(res=>{
              alert(res)
            })
          }else{
            alert("no scanner....")
          }  // ユーザ情報を取得する
          
        }
      })
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button style={{marginBottom:"20px"}} className="button" onClick={sendMessage}>send message</button> 

        <button style={{marginBottom:"20px"}} className="button" onClick={getUserInfo}>show user info</button> 
        <button style={{marginBottom:"20px"}} className="button" onClick={scanner}>scan??</button> 

        <button style={{marginBottom:"20px"}} className="button">
          <a href="https://line.me/R/nv/QRCodeReader">scannnnn</a>  
        </button> 

        
      </header>
    </div>
  );
}

export default App;
