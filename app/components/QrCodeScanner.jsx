import React, { useState } from "react";
import {
  Scanner,
  useDevices,
  outline,
  boundingBox,
  centerText,
} from "@yudiel/react-qr-scanner";

const styles = {
  container: {
    width: "90%",
    maxWidth: 500,
    margin: "auto",
    padding: 20,
  },
  controls: {
    marginBottom: 12,
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
  },
};

const QRCodeScanner = () => {
  const [deviceId, setDeviceId] = useState(undefined);
  const [pause, setPause] = useState(false);
  const [message, setMessage] = useState("📷 Scan a QR Code");
  const [messageTimer, setMessageTimer] = useState(null);
  const [tracker, setTracker] = useState("centerText");
  const devices = useDevices();

  const showMessage = (msg) => {
    setMessage(msg);
    clearTimeout(messageTimer);
    const timer = setTimeout(() => {
      setMessage("📷 Scan a QR Code");
    }, 5000);
    setMessageTimer(timer);
  };

  const handleScan = (codes) => {
    const url = codes[0]?.rawValue;
    if (!url) return;

    try {
      const params = new URLSearchParams(new URL(url).search);
      const team = params.get("team");
      const qrId = params.get("qrId");

      if (team || qrId) {
        showMessage(`✅ Scanned: ${team} - ${qrId}`)
      }

      fetch("/api/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ team, qrId }),
      })
        .then((res) => res.json())
        .then((data) => {
          showMessage(data.message || "✅ Success");
        })
        .catch(() => {
          showMessage("⚠️ Something went wrong");
        });
    } catch (err) {
      showMessage("❌ Invalid QR format");
    }
  };

  // const getTracker = () => {
  //   switch (tracker) {
  //     case "outline":
  //       return outline;
  //     case "boundingBox":
  //       return boundingBox;
  //     case "centerText":
  //       return centerText;
  //     default:
  //       return undefined;
  //   }
  // };

  return (
    <div style={styles.container}>
      <button
        onClick={() => setPause(!pause)}
        className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 transition rounded-lg font-medium"
      >
        {pause ? "▶️ Resume Scanner" : "⏸️ Pause Scanner"}
      </button>

      <div style={styles.controls}>
        {/* <select onChange={(e) => setDeviceId(e.target.value)}>
          <option value={undefined}>Select Camera</option>
          {devices.map((device, i) => (
            <option key={i} value={device.deviceId}>
              {device.label || `Camera ${i + 1}`}
            </option>
          ))}
        </select> */}

        {/* <select onChange={(e) => setTracker(e.target.value)}>
          <option value="centerText">Center Text</option>
          <option value="outline">Outline</option>
          <option value="boundingBox">Bounding Box</option>
          <option value="">No Tracker</option>
        </select> */}
      </div>

      <Scanner
        formats={["qr_code"]}
        constraints={{ deviceId }}
        paused={pause}
        scanDelay={1000}
        onScan={handleScan}
        onError={(err) => {
          console.error("Scanner error:", err);
          showMessage("⚠️ Camera error");
        }}
        components={{
          onOff: true,
          torch: true,
          zoom: true,
          finder: true,
          tracker: centerText,
        }}
        allowMultiple={false}
      />
      <div className="text-center mt-4 text-lg font-semibold text-white bg-black/80 rounded-md px-4 py-2 w-full">
        {message}
      </div>
    </div>
  );
};

export default QRCodeScanner;
