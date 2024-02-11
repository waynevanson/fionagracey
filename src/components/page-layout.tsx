import type { PageProps } from "gatsby"
import React from "react"
import { NavigationBar } from "./navigation-bar"
import * as styles from "./page-layout.module.scss"

export function PageLayout(props: PageProps) {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.heading}>Fiona Gracey</h1>

        <NavigationBar currentPathname={props.location.pathname} />
      </header>
      <main>{props.children}</main>
    </div>
  )
}
