import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface CompareState {
  selectedUniversityIds: string[];
}

const defaultCompareState: CompareState = {
  selectedUniversityIds: [],
};

interface CompareContextType {
  compareState: CompareState;
  setSelectedUniversityIds: (ids: string[]) => void;
  addUniversityId: (id: string) => void;
  removeUniversityId: (id: string) => void;
  toggleUniversityId: (id: string) => void;
  clearSelectedUniversities: () => void;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

const STORAGE_KEY = "compare_selected_universities";

// Загрузка выбранных университетов из localStorage
const loadCompareStateFromStorage = (): CompareState => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("Failed to load compare state from storage:", error);
  }
  return defaultCompareState;
};

// Сохранение выбранных университетов в localStorage
const saveCompareStateToStorage = (state: CompareState) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error("Failed to save compare state to storage:", error);
  }
};

export function CompareProvider({ children }: { children: ReactNode }) {
  const [compareState, setCompareState] = useState<CompareState>(
    loadCompareStateFromStorage
  );

  // Сохраняем состояние в localStorage при изменении
  useEffect(() => {
    saveCompareStateToStorage(compareState);
  }, [compareState]);

  const setSelectedUniversityIds = (ids: string[]) => {
    setCompareState((prev) => ({ ...prev, selectedUniversityIds: ids }));
  };

  const addUniversityId = (id: string) => {
    setCompareState((prev) => {
      if (prev.selectedUniversityIds.includes(id)) {
        return prev;
      }
      return {
        ...prev,
        selectedUniversityIds: [...prev.selectedUniversityIds, id],
      };
    });
  };

  const removeUniversityId = (id: string) => {
    setCompareState((prev) => ({
      ...prev,
      selectedUniversityIds: prev.selectedUniversityIds.filter(
        (existingId) => existingId !== id
      ),
    }));
  };

  const toggleUniversityId = (id: string) => {
    setCompareState((prev) => {
      if (prev.selectedUniversityIds.includes(id)) {
        return {
          ...prev,
          selectedUniversityIds: prev.selectedUniversityIds.filter(
            (existingId) => existingId !== id
          ),
        };
      }
      return {
        ...prev,
        selectedUniversityIds: [...prev.selectedUniversityIds, id],
      };
    });
  };

  const clearSelectedUniversities = () => {
    setCompareState(defaultCompareState);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <CompareContext.Provider
      value={{
        compareState,
        setSelectedUniversityIds,
        addUniversityId,
        removeUniversityId,
        toggleUniversityId,
        clearSelectedUniversities,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const context = useContext(CompareContext);
  if (context === undefined) {
    throw new Error("useCompare must be used within a CompareProvider");
  }
  return context;
}
