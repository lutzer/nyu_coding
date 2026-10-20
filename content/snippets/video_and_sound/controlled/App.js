import { useRef } from "react";

const VIDEO_URL = "https://www.w3schools.com/html/mov_bbb.mp4";
const DING_URL = "https://www.w3schools.com/html/horse.mp3";

export default function App() {
  const videoRef = useRef(null);
  const dingRef = useRef(null);

  return (
    <div>
      <video ref={videoRef} src={VIDEO_URL} />
      <div className="buttons">
        <button onClick={() => videoRef.current.play()}>Play</button>
        <button onClick={() => videoRef.current.pause()}>Pause</button>
        <button onClick={() => dingRef.current.play()}>Ding</button>
      </div>
      <audio ref={dingRef} src={DING_URL} />
    </div>
  );
}
