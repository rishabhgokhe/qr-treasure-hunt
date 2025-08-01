import React, { useState } from 'react';
import { Scanner, useDevices, outline, boundingBox, centerText } from '@yudiel/react-qr-scanner';

const styles = {
  container: {
    width: '90%',
    maxWidth: 500,
    margin: 'auto',
    padding: 20,
  },
  controls: {
    marginBottom: 12,
    display: 'flex',
    gap: 10,
    flexWrap: 'wrap',
  },
};

const QRCodeScanner = () => {
  const [deviceId, setDeviceId] = useState(undefined);
  const [pause, setPause] = useState(false);
  const [tracker, setTracker] = useState('centerText');
  const devices = useDevices();

  const getTracker = () => {
    switch (tracker) {
      case 'outline':
        return outline;
      case 'boundingBox':
        return boundingBox;
      case 'centerText':
        return centerText;
      default:
        return undefined;
    }
  };

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
        formats={['qr_code']}
        constraints={{ deviceId }}
        paused={pause}
        scanDelay={1000}
        onScan={(codes) => {
          console.log('QR Code Detected:', codes);
          // alert(`QR Code: ${codes.map((c) => c.rawValue).join(', ')}`);
        }}
        onError={(err) => console.error('Scanner error:', err)}
        components={{
          onOff: true,
          torch: true,
          zoom: true,
          finder: true,
          tracker: getTracker(),
        }}
        allowMultiple={false}
      />
    </div>
  );
};

export default QRCodeScanner;