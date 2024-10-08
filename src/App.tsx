import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(100);

  const words = ["frontend developer", "cool guy", "epic gamer"];

  useEffect(() => {
    const handleTyping = () => {
      const currentWord = words[loopNum % words.length];
      if (isDeleting) {
        setText(currentWord.substring(0, text.length - 1));
        setTypingSpeed(50);
      } else {
        setText(currentWord.substring(0, text.length + 1));
        setTypingSpeed(100);
      }

      if (!isDeleting && text === currentWord) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum]);

  return (
    <>
      <header>
        <h1>
          justifydev - <span id="typewriter">{text}</span>
          <span className="cursor">|</span>
        </h1>
      </header>
      <main>
        <img src="../images/arrow.png" className="arrow" />
        <div className="boxes-container">
          <div className="box">
            <h2>
              <a href="https://justifysasylum.vercel.app">
                link to the blog website
              </a>
            </h2>
          </div>
          <div className="box">
            <h2>
              <a href="https://justifysasylum.vercel.app/archives/dajjal.html">
                the dajjal
              </a>
            </h2>
          </div>
          <img src="../images/divider.png" className="divider" />
          <span>
            <a
              target="_blank"
              href="https://discord.com/users/877654517733261342"
            >
              <img src="../images/discord.png" id="discordLogo" />
            </a>
            <a target="_blank" href="https://www.instagram.com/justifyguy/">
              <img src="../images/instagram.png" id="instagramLogo" />
            </a>
            <a target="_blank" href="https://twitter.com/iamjustifi">
              <img src="../images/X.png" id="XLogo" />
            </a>
            <br />
            i'm justifydev, young frontend developer from jordan. <br />
            i've been doing web-dev for 2+ years, and am experienced in: <br />
            <b>HTML, CSS, JavaScript, ReactJS, C#</b>
            <br />
            <br />
            contact me through one of my socials above (click the icon) <br />
            also check out my blog posts :)
            <br />
            <br />
            justify @ 2024 <br />
            last updated october 8th, 2024
          </span>
        </div>
      </main>
    </>
  );
}

export default App;
