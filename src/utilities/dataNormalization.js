export const normalizeData = (data) => {
    const min = Math.min(...data);
    const max = Math.max(...data);
  
    return data.map((value) => (value - min) / (max - min));
  };
  