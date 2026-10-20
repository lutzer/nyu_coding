const VIDEO_URL = "https://www.w3schools.com/html/mov_bbb.mp4";
const AUDIO_URL = "https://www.w3schools.com/html/horse.mp3";

export default function App() {
  return (
    <div>
      <h2>Video</h2>
      <video src={VIDEO_URL} controls />

      <h2>Audio</h2>
      <audio src={AUDIO_URL} controls />
    </div>
  );
}
