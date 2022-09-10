import { Transition } from "../hooks/useTransition";
import { BottomBar } from "./BottomBar";
import { Button } from "./Button";
import { Check } from "./icons/Check";
import { Edit } from "./icons/Edit";
import { Trash } from "./icons/Trash";

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
    <BottomBar transition={transition}>
      <div className="flex gap-6 items-center justify-between">
        <div className="ml-1">{itemsSelected} selected</div>
        <div className="flex gap-2">
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
        <Button onClick={cancel}>Cancel</Button>
      </div>
    </BottomBar>
  );
};
