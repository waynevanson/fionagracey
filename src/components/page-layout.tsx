import type { PageProps } from "gatsby"
import React from "react"
import { NavigationBar } from "./navigation-bar"
import { Footer } from "./footer"

export function PageLayout(props: PageProps) {
  return (
    <div className="flex flex-col justify-stretch min-h-screen mx-auto my-0 px-4 max-w-screen-lg bg-slate-100">
      <header className="flex justify-between items-stretch gap-4 py-2 mb-4">
        <h1 className="text-4xl font-bold">Fiona Gracey</h1>
        <NavigationBar />
      </header>
      <main className="flex-grow">{props.children}</main>
      <Footer />
    </div>
  )
}
