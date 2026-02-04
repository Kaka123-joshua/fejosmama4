import { useState, useEffect } from "react";

export default function Home() { const [name, setName] = useState(""); const [photo, setPhoto] = useState(null); const [preview, setPreview] = useState(null); const eventDate = new Date("2026-02-14T12:00:00").getTime(); const [timeLeft, setTimeLeft] = useState({});

useEffect(() => { const timer = setInterval(() => { const now = new Date().getTime(); const distance = eventDate - now;

setTimeLeft({
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((distance / (1000 * 60)) % 60),
    seconds: Math.floor((distance / 1000) % 60),
  });
}, 1000);
return () => clearInterval(timer);

}, []);

const handlePhoto = (e) => { const file = e.target.files[0]; setPhoto(file); setPreview(URL.createObjectURL(file)); };

const share = () => { const text = I, ${name}, will be attending Hangout with Fejosmama 4.0!; const url = window.location.href; window.open(https://wa.me/?text=${encodeURIComponent(text + " " + url)}); };

return ( <div className="min-h-screen flex flex-col items-center justify-center bg-[url('/flyer.jpg')] bg-cover bg-center text-white px-4"> <div className="bg-black/60 p-6 rounded-2xl max-w-md w-full text-center"> <h1 className="text-2xl font-bold mb-3">Hangout with Fejosmama 4.0</h1>

{preview && (
      <img src={preview} className="w-32 h-32 rounded-full mx-auto mb-3 object-cover" />
    )}

    <input
      type="file"
      accept="image/*"
      onChange={handlePhoto}
      className="mb-3 w-full"
    />

    <input
      type="text"
      placeholder="Enter your name"
      value={name}
      onChange={(e) => setName(e.target.value)}
      className="w-full p-2 mb-3 rounded text-black"
    />

    {name && (
      <p className="font-semibold text-lg mb-4">
        I, <span className="text-yellow-400">{name}</span>, will be attending!
      </p>
    )}

    <div className="grid grid-cols-4 gap-2 text-sm mb-4">
      <div>{timeLeft.days}d</div>
      <div>{timeLeft.hours}h</div>
      <div>{timeLeft.minutes}m</div>
      <div>{timeLeft.seconds}s</div>
    </div>

    <button
      onClick={share}
      className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-full font-semibold"
    >
      Share on WhatsApp
    </button>
  </div>
</div>

); }
