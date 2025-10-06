import { useState } from "react";
import axios from "axios";

function App() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [parcel, setParcel] = useState(null);

  const searchParcel = async () => {
    const res = await axios.get(`/parcels?trackingNumber=${trackingNumber}`);
    console.log("res", res);
    setParcel(res.data[0]);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold">Tract Delivery</h1>
      <input
        type="text"
        placeholder="Enter Tracking Number"
        className="border p-2 w-full my-2"
        value={trackingNumber}
        onChange={(e) => setTrackingNumber(e.target.value)}
      />
      <button onClick={searchParcel} className="bg-blue-500 text-white px-4 py-2">Track</button>

      {parcel && (
        <div className="mt-6 border p-4 rounded">
          <h2 className="font-bold">Recipient: {parcel.recipient}</h2>
          <p>Status: {parcel.status}</p>
          <h3 className="mt-4 font-semibold">History:</h3>
          <div>
            {parcel.history.map((h, idx) => (
              <div key={idx}>{h.timestamp} - {h.status} @ {h.location}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
