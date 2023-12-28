import { create } from "zustand";

interface ModalState {
  isOpen: boolean;
  content: React.ReactNode | null;
}

interface ModalStore {
  modalState: ModalState;
  openModal: (content: React.ReactNode) => void;
  closeModal: () => void;
}

// 모달의 초기 상태
const initialState: ModalState = {
  isOpen: false,
  content: null,
};

// Zustand 스토어 생성
const useModalStore = create<ModalStore>((set) => ({
  modalState: { ...initialState },

  openModal: (content) => {
    set((state) => ({
      modalState: {
        ...state.modalState,
        isOpen: true,
        content,
      },
    }));
  },

  closeModal: () => {
    set((state) => ({
      modalState: {
        ...state.modalState,
        isOpen: false,
        content: null,
      },
    }));
  },
}));

export default useModalStore;
