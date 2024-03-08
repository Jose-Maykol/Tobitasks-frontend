import { type Status } from '@/types/Status'
import { create } from 'zustand'

interface StatusStore {
  statuses: Status[]
  setStatuses: (statuses: Status[]) => void
  getStatusName: (id: string) => string | undefined
}

const useStatusStore = create<StatusStore>((set, get) => ({
  statuses: [],
  setStatuses: (statuses) => { set({ statuses }) },
  getStatusName: (id) => {
    const status = get().statuses.find(status => status.id === id)
    return status !== undefined ? status.name : undefined
  }
}))

export default useStatusStore
