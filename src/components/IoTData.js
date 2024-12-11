import React, { useState, useEffect } from 'react';
import { normalizeData } from '../utilities/dataNormalization';

const IoTData = () => {
  const [rawData, setRawData] = useState([50, 60, 45, 70, 55]);
  const [normalizedData, setNormalizedData] = useState([]);

  useEffect(() => {
    const data = normalizeData(rawData);
    setNormalizedData(data);
  }, [rawData]);

  return (
    <div className="iot-data">
      <h2>IoT Health Data</h2>
      <p>Raw Data: {rawData.join(', ')}</p>
      <p>Normalized Data: {normalizedData.map((val) => val.toFixed(2)).join(', ')}</p>
    </div>
  );
};

export default IoTData;
