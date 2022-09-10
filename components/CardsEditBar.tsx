import { forwardRef } from "react";
import { useMyContext } from "../context/MyContext";
import { Transition } from "../hooks/useTransition";
import { EditBar } from "./EditBar";

interface CardsEditBarProps {
  transition: Transition;
  onEdit: () => void;
}

export const CardsEditBar = ({ transition, onEdit }: CardsEditBarProps) => {
  const {
    bulkEdit: { cancelSelect, numberOfSelected, deleteMany, selectAll },
  } = useMyContext();

  return (
    <EditBar
      cancel={cancelSelect}
      transition={transition}
      itemsSelected={numberOfSelected}
      remove={deleteMany}
      selectAll={selectAll}
      edit={onEdit}
    />
  );
};
