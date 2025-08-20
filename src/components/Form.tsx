import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import clsx from "clsx";
import type { TFormValues, TOption } from "../model/types";
import type { PropsWithChildren } from "react";

type TFormProps = PropsWithChildren<{
  options: TOption[];
  loading: boolean;
  onSubmit: (data: TFormValues) => Promise<void>;
}>;

const Form = ({ options, loading, onSubmit, children }: TFormProps) => {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors, isDirty },
  } = useForm<TFormValues>({
    defaultValues: {
      selectedOptions: [],
      textInput: "",
      maxLength: 65536,
      neighbours: 2,
      topChunks: 3,
      topDocuments: 3,
    },
    mode: "all",
    reValidateMode: "onChange",
  });

  const getInputClasses = (inputName: keyof TFormValues) =>
    clsx(
      "w-full shadow border rounded-lg py-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-gray-900 leading-tight focus:outline-none focus:ring-2",
      {
        "border-gray-300 dark:border-gray-700 focus:ring-blue-400":
          !errors[inputName],
        "border-red-600 focus:ring-red-600": errors[inputName],
      }
    );

  return (
    <form
      className="bg-white dark:bg-gray-800 shadow-md px-8 pt-8 pb-8 mb-8 w-full max-w-lg flex flex-col gap-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-4 w-full">
        <Controller
          name="selectedOptions"
          control={control}
          render={({ field }) => (
            <Select
              isMulti
              options={options}
              value={field.value}
              onChange={field.onChange}
              placeholder="Select documents..."
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
          )}
        />
        <input
          type="text"
          {...register("textInput", {
            required: true,
          })}
          className={getInputClasses("textInput")}
          placeholder="Enter search query"
        />
        <fieldset className="border border-gray-300 dark:border-gray-700 rounded-lg p-4">
          <legend className="text-gray-700 dark:text-gray-200 font-semibold">
            Options
          </legend>
          <div className="grid grid-cols-2 gap-2">
            <label className="text-gray-700 dark:text-gray-200">
              <span className="block mb-1">Max Length</span>
              <input
                type="number"
                min="4096"
                max="131072"
                {...register("maxLength", {
                  valueAsNumber: true,
                  required: true,
                  max: 131072,
                  min: 4096,
                })}
                placeholder="Max Length"
                className={getInputClasses("maxLength")}
              />
            </label>

            <label className="text-gray-700 dark:text-gray-200">
              <span className="block mb-1">Neighbours</span>
              <input
                type="number"
                min="0"
                max="10"
                {...register("neighbours", {
                  valueAsNumber: true,
                  required: true,
                  max: 10,
                  min: 0,
                })}
                placeholder="Neighbours"
                className={getInputClasses("neighbours")}
              />
            </label>

            <label className="text-gray-700 dark:text-gray-200">
              <span className="block mb-1">Top Chunks</span>
              <input
                type="number"
                min="1"
                max="10"
                {...register("topChunks", {
                  valueAsNumber: true,
                  required: true,
                  max: 10,
                  min: 1,
                })}
                placeholder="Top Chunks"
                className={getInputClasses("topChunks")}
              />
            </label>

            <label className="text-gray-700 dark:text-gray-200">
              <span className="block mb-1">Top Documents</span>
              <input
                type="number"
                min="1"
                max="10"
                {...register("topDocuments", {
                  valueAsNumber: true,
                  required: true,
                  max: 10,
                  min: 1,
                })}
                placeholder="Top Documents"
                className={getInputClasses("topDocuments")}
              />
            </label>
          </div>
        </fieldset>

        {children}

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white dark:bg-blue-700 dark:hover:bg-blue-500 dark:text-gray-100 font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition disabled:bg-gray-400 disabled:dark:bg-gray-600 disabled:cursor-not-allowed disabled:hover:bg-gray-400 disabled:dark:hover:bg-gray-600"
          disabled={loading || Object.keys(errors).length > 0 || !isDirty}
        >
          {loading ? "Loading..." : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default Form;
