import { forwardRef } from "react";
import { useMyContext } from "../context/MyContext";
import { Transition } from "../hooks/useTransition";
import { EditBar } from "./EditBar";

interface CardsEditBarProps {
  transition: Transition;
  onEdit: () => void;
}

export const CardsEditBar = forwardRef<HTMLDivElement, CardsEditBarProps>(
  ({ transition, onEdit }, ref) => {
    const {
      bulkEdit: { cancelSelect, numberOfSelected, deleteMany, selectAll },
    } = useMyContext();

    return (
      <div ref={ref}>
        <EditBar
          cancel={cancelSelect}
          transition={transition}
          itemsSelected={numberOfSelected}
          remove={deleteMany}
          selectAll={selectAll}
          edit={onEdit}
        />
      </div>
    );
  }
);
