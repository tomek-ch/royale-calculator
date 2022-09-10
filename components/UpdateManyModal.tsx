import { useMyContext } from "../context/MyContext";
import { Transition } from "../hooks/useTransition";
import { getRange } from "../utils/range";
import { Button } from "./Button";
import { Modal } from "./Modal";
import { Select, SelectBtn, SelectOption, SelectOptions } from "./Select";

interface UpdateManyModalProps {
  transition: Transition;
  inputFrom: number;
  setInputFrom: (value: number) => void;
  inputTo: number;
  setInputTo: (value: number) => void;
}

export const UpdateManyModal = ({
  transition,
  inputFrom,
  setInputFrom,
  inputTo,
  setInputTo,
}: UpdateManyModalProps) => {
  const {
    bulkEdit: {
      numberOfSelected,
      isSelectMode,
      maxStartLevel,
      cancelSelect,
      updateManyFrom,
      updateManyTo,
    },
  } = useMyContext();
  return (
    <Modal
      {...transition}
      title={`Editing ${numberOfSelected} ${
        numberOfSelected > 1 ? "items" : "item"
      }`}
    >
      Upgrade cards from level
      <Select
        selected={inputFrom}
        onChange={setInputFrom}
        className="w-20 mt-2 mb-4 z-10"
      >
        <SelectBtn>{inputFrom || "Mixed"}</SelectBtn>
        <SelectOptions>
          {isSelectMode &&
            getRange(maxStartLevel, 14).map((value) => (
              <SelectOption key={value} value={value}>
                {value}
              </SelectOption>
            ))}
        </SelectOptions>
      </Select>
      Upgrade cards to level
      <Select selected={inputTo} onChange={setInputTo} className="w-20 mt-2">
        <SelectBtn>{inputTo || "Mixed"}</SelectBtn>
        <SelectOptions>
          {isSelectMode &&
            getRange(maxStartLevel, 14).map((value) => (
              <SelectOption key={value} value={value}>
                {value}
              </SelectOption>
            ))}
        </SelectOptions>
      </Select>
      <div className="flex justify-end gap-2 mt-4">
        <Button
          onClick={() => {
            transition.toggle();
            cancelSelect();
          }}
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            if (inputFrom) {
              updateManyFrom(inputFrom);
            }
            if (inputTo) {
              updateManyTo(inputTo);
            }
            transition.toggle();
            cancelSelect();
          }}
        >
          Save
        </Button>
      </div>
    </Modal>
  );
};
