import { ReactNode } from "react";
import { Transition } from "../hooks/useTransition";
import { BottomBar } from "./BottomBar";
import { Button } from "./Button";
import { Check } from "./icons/Check";
import { Edit } from "./icons/Edit";
import { Trash } from "./icons/Trash";
import { Xmark } from "./icons/Xmark";
import { Tooltip } from "./Tooltip";
import { TopBar } from "./TopBar";

interface EditBarProps {
  transition: Transition;
  edit: () => void;
  remove: () => void;
  selectAll: () => void;
  cancel: () => void;
  itemsSelected: number;
}

const EditBarBtn = ({
  icon,
  label,
  onClick,
}: {
  icon: ReactNode;
  label: string;
  onClick: () => void;
}) => {
  return (
    <label className="flex flex-col items-center w-20 md:w-auto relative">
      <Tooltip title={label}>
        <Button variant="round" size="md" onClick={onClick}>
          {icon}
        </Button>
      </Tooltip>
      <div className="md:hidden -mt-1">{label}</div>
    </label>
  );
};

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
          <div className="flex md:gap-2 w-full md:w-auto justify-evenly">
            {[
              {
                label: "Select all",
                onClick: selectAll,
                icon: <Check width="20" />,
              },
              { label: "Edit", onClick: edit, icon: <Edit width="20" /> },
              { label: "Delete", onClick: remove, icon: <Trash width="20" /> },
            ].map((props) => (
              <EditBarBtn key={props.label} {...props} />
            ))}
          </div>
          <Button className="hidden md:block" onClick={cancel}>
            Cancel
          </Button>
        </div>
      </BottomBar>
    </>
  );
};
