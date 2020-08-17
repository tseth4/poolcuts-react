import React, { useState } from "react";

export default function LocationSelect() {
  const [val, setVal] = useState();

  const handleSelectChange = (event: any) => {
    setVal(event.target.value);
  };

  if (val) console.log(val);
  
  return (
    <div>
      <select onClick={handleSelectChange}>
        <option value="Studio">Home</option>
        <option value="Shop">Shop</option>
      </select>
    </div>
  );
}
