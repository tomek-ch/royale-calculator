import { Transition } from "../hooks/useTransition";
import { BottomBar } from "./BottomBar";
import { Button } from "./Button";
import { Check } from "./icons/Check";
import { Edit } from "./icons/Edit";
import { Trash } from "./icons/Trash";
import { Xmark } from "./icons/Xmark";
import { TopBar } from "./TopBar";

interface EditBarProps {
  transition: Transition;
  edit: () => void;
  remove: () => void;
  selectAll: () => void;
  cancel: () => void;
  itemsSelected: number;
}

export const EditBar = ({
  edit,
  remove,
  selectAll,
  cancel,
  transition,
  itemsSelected,
}: EditBarProps) => {
  return (
    <>
      <div className="md:hidden">
        <TopBar transition={transition}>
          <div className="flex justify-between items-center gap-4 h-10">
            <div>
              {itemsSelected} {itemsSelected === 1 ? "item" : "items"} selected
            </div>
            <Button onClick={cancel} variant="round">
              <Xmark height="38" />
            </Button>
          </div>
        </TopBar>
      </div>
      <BottomBar transition={transition}>
        <div className="flex gap-6 items-center justify-between">
          <div className="ml-1 hidden md:block">{itemsSelected} selected</div>
          <div className="flex gap-6 md:gap-2 w-full md:w-auto justify-center">
            <Button variant="round" size="md" onClick={selectAll}>
              <Check width="20" />
            </Button>
            <Button variant="round" size="md" onClick={edit}>
              <Edit width="20" />
            </Button>
            <Button variant="round" size="md" onClick={remove}>
              <Trash width="20" />
            </Button>
          </div>
          <Button className="hidden md:block" onClick={cancel}>
            Cancel
          </Button>
        </div>
      </BottomBar>
    </>
  );
};
