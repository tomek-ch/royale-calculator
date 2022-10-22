import { useMyContext } from "../context/MyContext";
import { Transition } from "../hooks/useTransition";
import { Button } from "./Button";
import { ArrowUp } from "./icons/ArrowUp";
import { CircleQuestion } from "./icons/CircleQuestion";
import { Sync } from "./icons/Sync";
import { InlineAlert } from "./InlineAlert";
import { Modal } from "./Modal";
import { Select, SelectBtn, SelectOption, SelectOptions } from "./Select";
import { Tooltip } from "./Tooltip";

interface UpdateManyModalProps {
  transition: Transition;
}

export const UpdateManyModal = ({ transition }: UpdateManyModalProps) => {
  const {
    bulkEdit: {
      numberOfSelected,
      isSelectMode,
      cancelSelect,
      maxOnSave,
      syncOnSave,
      updateFrom,
      updateTo,
      updateFromRange,
      updateToRange,
      setUpdateFrom,
      setUpdateTo,
      setMaxOnSave,
      setSyncOnSave,
      save,
      canSync,
    },
    player: { player },
  } = useMyContext();

  return (
    <Modal
      {...transition}
      title={`Editing ${numberOfSelected} ${
        numberOfSelected === 1 ? "item" : "items"
      }`}
    >
      Upgrade from level
      <div className="mt-2 mb-4">
        <div className="flex gap-2 items-center">
          <Select
            selected={updateFrom}
            onChange={setUpdateFrom}
            className="w-20 z-10"
          >
            <SelectBtn>{updateFrom || "Mixed"}</SelectBtn>
            <SelectOptions>
              {isSelectMode &&
                updateFromRange.map((value) => (
                  <SelectOption key={value} value={value}>
                    {value}
                  </SelectOption>
                ))}
            </SelectOptions>
          </Select>
          {canSync && (
            <>
              <Button
                className="flex items-center gap-2"
                onClick={setSyncOnSave}
              >
                <Sync width="16" className="-ml-1" />
                Sync
              </Button>
              <Tooltip
                title="Sync value with your actual card level"
                position="bottom"
                className="w-72 z-20"
              >
                <Button
                  variant="round"
                  size="md"
                  className="-ml-1 dark:hover:!bg-slate-700"
                >
                  <CircleQuestion
                    width="20"
                    className="text-slate-600 dark:text-slate-500"
                  />
                </Button>
              </Tooltip>
            </>
          )}
        </div>
        {syncOnSave && (
          <InlineAlert variant="success" className="mt-2">
            Levels will be synced on save
          </InlineAlert>
        )}
      </div>
      Upgrade to level
      <div className="mt-2">
        <div className="flex gap-2 items-center">
          <Select selected={updateTo} onChange={setUpdateTo} className="w-20">
            <SelectBtn>{updateTo || "Mixed"}</SelectBtn>
            <SelectOptions>
              {isSelectMode &&
                updateToRange.map((value) => (
                  <SelectOption key={value} value={value}>
                    {value}
                  </SelectOption>
                ))}
            </SelectOptions>
          </Select>
          {canSync && (
            <>
              <Button
                className="flex items-center gap-2"
                onClick={setMaxOnSave}
              >
                <ArrowUp height="16" className="-ml-1" />
                Max
              </Button>
              <Tooltip
                title="Set upgrade level to the maximum allowed by your card count"
                position="bottom"
                className="w-72"
              >
                <Button
                  variant="round"
                  size="md"
                  className="-ml-1 dark:hover:!bg-slate-700"
                >
                  <CircleQuestion
                    width="20"
                    className="text-slate-600 dark:text-slate-500"
                  />
                </Button>
              </Tooltip>
            </>
          )}
        </div>
        {maxOnSave && (
          <InlineAlert variant="success" className="mt-2">
            Levels will be synced on save
          </InlineAlert>
        )}
      </div>
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
            save();
            transition.toggle();
          }}
        >
          Save
        </Button>
      </div>
    </Modal>
  );
};
