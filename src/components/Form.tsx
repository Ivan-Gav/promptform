import Select from "react-select";
import type { OptionType } from "../model/types";

type TFormProps = {
  options: OptionType[];
  selectedOptions: OptionType[];
  setSelectedOptions: (opts: OptionType[]) => void;
  textInput: string;
  setTextInput: (val: string) => void;
  loading: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
};

const Form = ({
  options,
  selectedOptions,
  setSelectedOptions,
  textInput,
  setTextInput,
  loading,
  onSubmit,
}: TFormProps) => {
  return (
    <form
      className="bg-white dark:bg-gray-800 shadow-md px-8 pt-8 pb-8 mb-8 w-full max-w-lg flex flex-col gap-6"
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
            control: (base, state) => {
              const isDark = window.matchMedia(
                "(prefers-color-scheme: dark)"
              ).matches;
              return {
                ...base,
                minHeight: 44,
                borderRadius: 8,
                borderColor: state.isFocused ? "#3b82f6" : "#d1d5db",
                boxShadow: "none",
                paddingLeft: 2,
                backgroundColor: isDark ? "#1f2937" : "#fff",
                color: isDark ? "#e5e7eb" : "#374151",
              };
            },
            multiValue: (base) => {
              const isDark = window.matchMedia(
                "(prefers-color-scheme: dark)"
              ).matches;
              return {
                ...base,
                borderRadius: 6,
                backgroundColor: isDark ? "#374151" : base.backgroundColor,
              };
            },
            multiValueLabel: (base) => {
              const isDark = window.matchMedia(
                "(prefers-color-scheme: dark)"
              ).matches;
              return {
                ...base,
                color: isDark ? "#e5e7eb" : "#374151",
              };
            },
            menu: (base) => {
              const isDark = window.matchMedia(
                "(prefers-color-scheme: dark)"
              ).matches;
              return {
                ...base,
                backgroundColor: isDark ? "#1f2937" : "#fff",
              };
            },
            option: (base, state) => {
              const isDark = window.matchMedia(
                "(prefers-color-scheme: dark)"
              ).matches;
              return {
                ...base,
                backgroundColor: state.isSelected
                  ? isDark
                    ? "#2563eb"
                    : "#3b82f6"
                  : state.isFocused
                  ? isDark
                    ? "#374151"
                    : "#f3f4f6"
                  : isDark
                  ? "#1f2937"
                  : "#fff",
                color: state.isSelected
                  ? "#fff"
                  : isDark
                  ? "#e5e7eb"
                  : "#374151",
              };
            },
          }}
        />
        <input
          type="text"
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          className="w-full shadow appearance-none border border-gray-300 dark:border-gray-700 rounded-lg py-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-900 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter some text"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white dark:bg-blue-700 dark:hover:bg-blue-500 dark:text-gray-100 font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          disabled={loading}
        >
          {loading ? "Loading..." : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default Form;
