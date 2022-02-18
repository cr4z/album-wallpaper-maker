import React, { createContext, useRef, useState } from "react";
import AlbumPickerModal from "./modal";

export const ModalContext = createContext<any>(null);
export interface IModalContext {
  openModal: Function;
  setCallback: Function;
}

type Props = { children: any };
export function ModalContextWrapper({ children }: Props) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const providedCallbackRef = useRef<Function>();

  function onAlbumSelected(src: string) {
    if (!providedCallbackRef.current) throw new Error("Callback not provided!");
    providedCallbackRef.current(src);
  }

  const store: IModalContext = {
    openModal: () => {
      setShowModal(true);
    },
    setCallback: (cb: Function) => {
      providedCallbackRef.current = cb;
    },
  };

  return (
    <ModalContext.Provider value={store}>
      <AlbumPickerModal
        showModal={showModal}
        setShowModal={setShowModal}
        onAlbumSelected={onAlbumSelected}
      />
      {children}
    </ModalContext.Provider>
  );
}
