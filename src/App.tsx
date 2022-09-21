import { useState } from "react";
import "./index.css";
import { Select } from "./Select";
import { Option } from "./Select";

const options = [
  { label: "First", value: 3 },
  { label: "Second", value: 4 },
  { label: "Third", value: 5 },
  { label: "Four", value: 7 },
];

function App() {
  const [value, setValue] = useState<Option | undefined>(options[0]);

  return (
    <div className="my-3 w-96 mx-auto p-2 bg-slate-200">
      <Select
        options={options}
        value={value}
        onChange={(value) => setValue(value)}
      />
    </div>
  );
}

export default App;
