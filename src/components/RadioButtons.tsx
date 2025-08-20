import { type ChangeEvent, type Dispatch, type SetStateAction } from "react";
import clsx from "clsx";
import type { TEndpointName } from "../model/types";

type TRadioButtonsProps = {
  variants: TEndpointName[];
  selected: TEndpointName;
  setSelected: Dispatch<SetStateAction<TEndpointName>>;
  disabled?: boolean;
};

export const RadioButtons = ({
  variants,
  selected,
  setSelected,
  disabled = false,
}: TRadioButtonsProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelected(e.target.value as typeof selected);
  };

  return (
    <fieldset className="border border-gray-300 dark:border-gray-700 rounded-lg p-4 mb-4">
      <legend className="text-gray-700 dark:text-gray-200 font-semibold mb-2">
        Endpoint
      </legend>
      <div className="flex flex-wrap gap-4">
        {variants.map((variant) => (
          <label
            key={variant}
            className={clsx(
              "flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-200 transition-colors ",
              {
                "hover:bg-blue-100 dark:hover:bg-blue-900 cursor-pointer":
                  !disabled,
                "opacity-50 pointer-events-none cursor-not-allowed": disabled,
              }
            )}
          >
            <input
              type="radio"
              name="Endpoints"
              value={variant}
              checked={selected === variant}
              onChange={handleChange}
              className="accent-blue-500 w-4 h-4"
            />
            <span className="font-medium">{variant}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
};
