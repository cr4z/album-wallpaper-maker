import React, { useEffect, useState } from "react";

interface IPaginatorProps {
  page: number;
  itemsPerPage: number;
  children: JSX.Element[];
}

export default function Paginator({ page, itemsPerPage, children }: IPaginatorProps) {
  const [items, setItems] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const newItems: JSX.Element[] = [];
    for (let i = 0; i < itemsPerPage; i++) {
      const index = page * i;
      newItems.push(children[index]);
    }
    setItems(newItems);
  }, [children]);

  return <div className="modal-grid">{items}</div>;
}
