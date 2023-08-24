import { useState, useRef } from 'react'
import './App.css'
import './Spinner.css'

function App() {
  const [text, setText] = useState("");
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const textArea = useRef(null);

  return (
    <div className="App">
      <div className="MainWindow">
        <h1>
          Patek TTS
        </h1>
        <textarea ref={textArea}
                  spellCheck={false}
                  maxLength={600}
                  onChange={e => setCount(e.target.value.length)}>
        </textarea>
        <p className="count">
            {count}/600
        </p>
        <div className="ioWindow">
          <div className="generate">
            {
              loading ? <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
              : <button onClick={() => {
                  setError(false);
                  setText(textArea.current.value);
                }}>
                  Generate
                </button>
            }
          </div>
          <div className="audio">
            {
              text === "" ? <audio controls></audio> : error ? <div className="error">Error</div> : (
                <audio controls
                key={text}
                onLoadStart={() => {
                  setLoading(true);
                }}
                onCanPlay={() => {
                  setLoading(false);
                }}
                onError={() => {
                  setError(true);
                  setLoading(false);
                }}>
                  <source src={"https://antonimlynarczyk.com/?text='" + text + "'"}/>
                </audio>
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
