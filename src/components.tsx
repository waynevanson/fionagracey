import { Link } from "gatsby"
import React, { CSSProperties, ComponentProps, PropsWithChildren } from "react"

const links: Array<Record<"label" | "to", string>> = [
  { label: "Home", to: "/" },
  { label: "Recipes", to: "/recipes" },
]

const styles: Record<
  "nav" | "header" | "pageLayout" | "main",
  CSSProperties | undefined
> = {
  pageLayout: {
    margin: "0 auto",
    maxWidth: "60rem",
    backgroundColor: "white",
    height: "100vh",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ffcccc",
    padding: "0 2rem",
  },
  nav: { display: "flex", gap: ".5rem" },
  main: {
    padding: "2rem 2rem",
  },
}

export function Navigation() {
  return (
    <nav style={styles.nav}>
      {links.map((link) => (
        <Link key={link.to} to={link.to}>
          {link.label}
        </Link>
      ))}
    </nav>
  )
}

export function PageLayout(props: PropsWithChildren<ComponentProps<"div">>) {
  return (
    <div {...props} style={styles.pageLayout}>
      <header style={styles.header}>
        <h1>Fiona Gracey</h1>
        <Navigation />
      </header>
      <main style={styles.main}>{props.children}</main>
    </div>
  )
}
