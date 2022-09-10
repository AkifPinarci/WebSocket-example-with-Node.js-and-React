import { useState, useEffect } from "react";
import Video from "./assets/vavaCars.mp4";
const ws = new WebSocket("ws://localhost:8082");
function App() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    ws.addEventListener("open", (e) => {
      console.log(e);
      console.log("We are connected");
    });
  }, []);

  const sendData = (event) => {
    ws.send(JSON.stringify(event));
  };

  ws.onmessage = (event) => {
    console.log(
      event.data.text().then((el) => {
        var ell = JSON.parse(el);
        console.log(ell);
        setVisible(ell.visibility);
      })
    );
  };

  return (
    <>
      <div className="image">
        {visible ? (
          <video
            autoPlay={true}
            loop={true}
            muted={false}
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              position: "absolute", //Here is the trick
              bottom: 0,
            }}
          >
            <source src={Video} type="video/mp4"></source>
          </video>
        ) : (
          <></>
        )}
        <button
          onClick={() => {
            sendData({ visibility: !visible, unvis: "Sa", vis: "Sas" });
          }}
        >
          Sa
        </button>
      </div>
    </>
  );
}

export default App;
