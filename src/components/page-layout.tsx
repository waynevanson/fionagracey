import type { PageProps } from "gatsby"
import React from "react"
import { NavigationBar } from "./navigation-bar"

export function PageLayout(props: PageProps) {
  return (
    <div className="mx-auto my-0 max-w-screen-lg">
      <header className="flex justify-between items-stretch gap-4 pt-2 mb-4">
        <h1 className="text-4xl">Fiona Gracey</h1>
        <NavigationBar />
      </header>
      <main>{props.children}</main>
    </div>
  )
}
