import React from "react"

function dispatchStorageEvent(key: string | null, newValue: string | null) {
  window.dispatchEvent(new StorageEvent("storage", { key, newValue }))
}

const setLocalStorageItem = <T>(key: string, value: T) => {
  const stringifiedValue = JSON.stringify(value)
  window.localStorage.setItem(key, stringifiedValue)
  dispatchStorageEvent(key, stringifiedValue)
}

const removeLocalStorageItem = (key: string) => {
  window.localStorage.removeItem(key)
  dispatchStorageEvent(key, null)
}

const getLocalStorageItem = (key: string) => {
  return window.localStorage.getItem(key)
}

const useLocalStorageSubscribe = (callback: () => void) => {
  window.addEventListener("storage", callback)
  return () => window.removeEventListener("storage", callback)
}

const getLocalStorageServerSnapshot = <T>(initialValue: T) => {
  return JSON.stringify(initialValue)
}

export function useLocalStorage<T>(key: string, initialValue: T) {
  const getSnapshot = () => getLocalStorageItem(key)

  const store = React.useSyncExternalStore(
    useLocalStorageSubscribe,
    getSnapshot,
    () => getLocalStorageServerSnapshot(initialValue)
  )

  const setState: React.Dispatch<React.SetStateAction<T>> = React.useCallback(
    (v) => {
      try {
        //@ts-expect-error
        const nextState = typeof v === "function" ? v(JSON.parse(store)) : v

        if (nextState === undefined || nextState === null) {
          removeLocalStorageItem(key)
        } else {
          setLocalStorageItem(key, nextState)
        }
      } catch (e) {
        console.warn(e)
      }
    },
    [key, store]
  )

  React.useEffect(() => {
    if (getLocalStorageItem(key) === null) {
      setLocalStorageItem(key, initialValue)
    }
  }, [key, initialValue])

  return [store != null ? JSON.parse(store) : initialValue, setState] as const
}
