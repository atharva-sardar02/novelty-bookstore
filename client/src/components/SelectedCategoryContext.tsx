import React, { createContext, useContext, ReactNode, useState } from 'react';

interface SelectedCategoryContextType {
    selectedCategory: number | null;
    setSelectedCategory: (categoryId: number | null) => void;
}

const SelectedCategoryContext = createContext<SelectedCategoryContextType>({
    selectedCategory: null,
    setSelectedCategory: () => {},
});

export const useSelectedCategory = (): SelectedCategoryContextType =>
    useContext(SelectedCategoryContext);

export const SelectedCategoryProvider = ({ children }: { children: ReactNode }) => {
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

    return (
        <SelectedCategoryContext.Provider value={{ selectedCategory, setSelectedCategory }}>
            {children}
        </SelectedCategoryContext.Provider>
    );
};
