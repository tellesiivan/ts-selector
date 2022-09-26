import React, { useState } from "react";
import { VscClose, VscChevronDown } from "react-icons/vsc";

export type Option = {
  label: string;
  value: string | number;
};

type MultipleSelectProps = {
  multiple: true;
  value: Option[];
  onChange: (value: Option[]) => void;
};

type SingleSelectProps = {
  multiple?: false;
  options: Option[];
  value?: Option;
  onChange: (value: Option | undefined) => void;
};

type SelectProps = {
  options: Option[];
} & (SingleSelectProps | MultipleSelectProps);

export const Select = ({ multiple, value, onChange, options }: SelectProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const clearOptions = () => {
    multiple ? onChange([]) : onChange(undefined);
  };

  const selectOption = (option: Option): void => {
    if (multiple) {
      if (value?.includes(option)) {
        onChange(value.filter((opt) => opt !== option));
      } else {
        onChange([...value, option]);
      }
    } else if (option.value !== value?.value) {
      onChange(option);
    }
  };

  const multipleOptArray = (value: Option): JSX.Element | null => (
    <button
      key={value.label}
      className={`p-1.5 border border-slate-200 rounded-full flex space-x-2 w-20 justify-between items-center text-xs`}
      onClick={(e) => {
        e.stopPropagation();
        selectOption(value);
      }}
    >
      {value.label}
      <span>
        <VscClose size="1.1em" />
      </span>
    </button>
  );

  return (
    <div
      onBlur={() => setIsOpen(false)}
      tabIndex={0}
      className="h-12 bg-white rounded-md  items-center flex relative focus:bg-slate-100 justify-between pl-2 pr-1"
    >
      <div
        className=" h-full items-center flex-1 flex space-x-2 text-sm"
        onClick={() => setIsOpen(true)}
      >
        {multiple
          ? value?.map((option) => multipleOptArray(option))
          : value?.label}
      </div>
      <div className="flex divide-x divide-slate-400 text-gray-500">
        <button
          className="pr-2"
          onClick={(e) => {
            e.stopPropagation();
            clearOptions();
          }}
        >
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
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
              selectOption(option);
            }}
            key={option.value}
            className={`p-2 text-sm text-slate-600 hover:bg-slate-100 cursor-pointer ${
              multiple
                ? value.includes(option) && "bg-slate-100"
                : option.value === value?.value && "bg-slate-100"
            }`}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
};
