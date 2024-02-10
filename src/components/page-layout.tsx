import type { PageProps } from "gatsby"
import React from "react"
import { NavigationBar } from "./navigation-bar"

export function PageLayout(props: PageProps) {
  return (
    <div>
      <header>
        <h1>Fiona Gracey</h1>
        <NavigationBar currentPathname={props.location.pathname} />
      </header>
      <main>{props.children}</main>
    </div>
  )
}
