import React from "react";
import Select from "react-select";
import type { OptionType } from "../api/index";

interface FormProps {
  options: OptionType[];
  selectedOptions: OptionType[];
  setSelectedOptions: (opts: OptionType[]) => void;
  textInput: string;
  setTextInput: (val: string) => void;
  loading: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

const Form: React.FC<FormProps> = ({
  options,
  selectedOptions,
  setSelectedOptions,
  textInput,
  setTextInput,
  loading,
  onSubmit,
}) => {
  return (
    <form
      className="bg-white shadow-md rounded px-8 pt-8 pb-8 mb-8 w-full max-w-lg flex flex-col gap-6"
      onSubmit={onSubmit}
    >
      <div className="flex flex-col gap-4 w-full">
        <Select
          isMulti
          options={options}
          value={selectedOptions}
          onChange={setSelectedOptions as any}
          className="w-full"
          classNamePrefix="react-select"
          styles={{
            control: (base) => ({ ...base, minHeight: 44, borderRadius: 8, borderColor: '#d1d5db', boxShadow: 'none', paddingLeft: 2 }),
            multiValue: (base) => ({ ...base, borderRadius: 6 }),
          }}
        />
        <input
          type="text"
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          className="w-full shadow appearance-none border border-gray-300 rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter some text"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          disabled={loading}
        >
          {loading ? "Loading..." : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default Form;
