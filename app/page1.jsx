"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const eventDate = new Date("2026-12-31T23:59:59").getTime(); // adjust your event date
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = eventDate - now;
      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((distance / (1000 * 60)) % 60),
        seconds: Math.floor((distance / 1000) % 60)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    setPreview(URL.createObjectURL(file));
  };

  const share = () => {
    const text = `I, ${name}, will be attending Hangout with Fejosmama 4.0!`;
    const url = window.location.href;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text + " " + url)}`, "_blank");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/flyer.jpg')" }}>
      {preview && <img src={preview} className="w-32 h-32 rounded-full mb-3 object-cover" />}
      
      <input type="file" accept="image/*" onChange={handlePhoto} className="mb-3 w-full" />
      
      <input type="text" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 mb-3 rounded text-black" />
      
      {name && <p className="font-semibold text-lg mb-4">I, <span className="text-yellow-400">{name}</span>, will be attending!</p>}
      
      <div className="grid grid-cols-4 gap-2 text-sm mb-4">
        <div>{timeLeft.days}d</div>
        <div>{timeLeft.hours}h</div>
        <div>{timeLeft.minutes}m</div>
        <div>{timeLeft.seconds}s</div>
      </div>
      
      <button onClick={share} className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-full font-semibold">
        Share on WhatsApp
      </button>
    </div>
  );
    }
