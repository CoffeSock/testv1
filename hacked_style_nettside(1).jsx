import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function HackedPage() {
  const [lines, setLines] = useState([]);
  const [current, setCurrent] = useState(0);
  const [started, setStarted] = useState(false);
  const [url, setUrl] = useState("");

  const bootSequence = [
    "[BOOT] Initializing kernel...",
    "[OK] Loading system modules",
    "[OK] Mounting /dev/secure",
    "[WARN] Firewall signature mismatch",
    "[OK] Establishing network connection",
    "[INFO] Scanning open ports...",
    "[ALERT] Unauthorized access detected",
    "[CRITICAL] Root-level permissions granted",
    "[INFO] Dumping memory sectors...",
    "[DONE] Session hijack complete",
    "[SYSTEM] You are now in control"
  ];

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  useEffect(() => {
    if (!started) return;
    if (current >= bootSequence.length) return;

    const timeout = setTimeout(() => {
      setLines((prev) => [...prev, bootSequence[current]]);
      setCurrent(current + 1);
    }, 800);

    return () => clearTimeout(timeout);
  }, [current, started]);

  if (!started) {
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(url)}`;

    return (
      <div className="h-screen w-full bg-black text-green-400 font-mono flex flex-col items-center justify-center p-6">
        <motion.h1
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-red-500 text-2xl mb-6 text-center"
        >
          ⚠ SYSTEM LOCKED ⚠
        </motion.h1>

        <p className="mb-6 text-sm opacity-80 text-center">
          Scan QR-koden for å aktivere systemtilgang
        </p>

        <img
          src={qrUrl}
          alt="QR code"
          className="w-48 h-48 border border-green-500 p-2 bg-white"
        />

        <button
          onClick={() => setStarted(true)}
          className="mt-8 px-4 py-2 border border-green-500 hover:bg-green-500 hover:text-black transition"
        >
          Manuell override
        </button>
      </div>
    );
  }

  return (
    <div className="h-screen w-full bg-black text-green-400 font-mono p-6 overflow-hidden relative">
      {/* scanlines */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,255,0,0.15)_3px)]" />

      {/* header */}
      <motion.div
        animate={{ opacity: [0.8, 1, 0.8] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="text-red-500 text-2xl mb-4"
      >
        ⚠ SYSTEM SECURITY BREACH DETECTED ⚠
      </motion.div>

      {/* terminal output */}
      <div className="text-sm leading-relaxed">
        {lines.map((line, i) => (
          <div key={i} className="mb-1">
            {line}
          </div>
        ))}

        <span className="inline-block w-2 h-4 bg-green-400 ml-1 animate-pulse" />
      </div>

      {/* status panel */}
      <div className="absolute bottom-6 right-6 border border-green-500 p-3 text-xs opacity-70">
        <div>IP: 185.132.xxx.xxx</div>
        <div>LOCATION: UNKNOWN</div>
        <div>SECURITY: OVERRIDDEN</div>
        <div>CONNECTION: ENCRYPTED (FORCED)</div>
      </div>

      {/* flicker */}
      <div className="absolute inset-0 animate-pulse bg-red-500 opacity-5" />
    </div>
  );
}
