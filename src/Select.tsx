import React, { useState } from "react";
import { VscClose, VscChevronDown } from "react-icons/vsc";

export type Option = {
  label: string;
  value: string | number;
};

type SelectProps = {
  options: Option[];
  value?: Option;
  onChange: (value: Option | undefined) => void;
};

export const Select = ({ value, onChange, options }: SelectProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div
      tabIndex={0}
      className="h-12 bg-white rounded-md  items-center flex relative focus:bg-slate-100 justify-between pl-2 pr-1"
    >
      <div
        className=" h-full items-center flex-1 flex space-x-2 text-sm"
        onClick={() => setIsOpen(true)}
      >
        {value?.label}
      </div>
      <div className="flex divide-x divide-slate-400 text-gray-500">
        <button className="pr-2" onClick={() => setIsOpen(false)}>
          <VscClose size="1.3em" />
        </button>
        <button className="pl-2 " onClick={() => setIsOpen(true)}>
          <VscChevronDown size="1.3em" />
        </button>
      </div>
      <ul
        className={`!ml-0 overflow-y-scroll h-36 drop-shadow-xl bg-white  rounded-md absolute top-16  w-full left-0 divide-y-[1px] divide-slate-200 select-none border-[1px] border-slate-200 ${
          isOpen ? "block" : "hidden"
        }`}
      >
        {options.map((option: Option) => (
          <li
            onClick={() => {
              onChange(option);
              setIsOpen(false);
            }}
            key={option.value}
            className="p-2 text-sm text-slate-600 hover:bg-slate-100 cursor-pointer selecte"
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
};
