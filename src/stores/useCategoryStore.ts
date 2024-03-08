import { type Category } from '@/types/Category'
import { create } from 'zustand'

interface CategoryStore {
  categories: Category[]
  setCategories: (categories: Category[]) => void
  getCategoryName: (id: string) => string | undefined
}

const useCategoryStore = create<CategoryStore>((set, get) => ({
  categories: [],
  setCategories: (categories) => { set({ categories }) },
  getCategoryName: (id: string) => {
    const category = get().categories.find(category => category.id === id)
    return category !== undefined ? category.name : undefined
  }
}))

export default useCategoryStore
