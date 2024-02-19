import { useLocalStorage } from "./use-local-storage"

export function useLocalStorageCheckboxes(key: string) {
  const [checks, checksSet] = useLocalStorage<Array<number>>(key, [])

  const checkSet = (index: number) => {
    checksSet((checked) => {
      const next = [...checked]

      let checkedIndex = next.indexOf(index)
      if (checkedIndex < 0) {
        next.push(index)
      } else {
        next.splice(checkedIndex, 1)
      }

      return next
    })
  }

  const getCheck = (index: number) => checks.includes(index)

  return [getCheck, checkSet] as const
}
