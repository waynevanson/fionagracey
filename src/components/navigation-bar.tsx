import { MenuItem, Menubar } from "@ariakit/react"
import { Link, navigate } from "gatsby"
import React from "react"
import * as styles from "./navigation-bar.module.scss"
import { clsx } from "clsx"

type Links = Array<Record<"label" | "path", string>>

const links: Links = [
  { label: "Home", path: "/" },
  { label: "Recipes", path: "/recipes/" },
]

export function findLinkIndexByPathname(
  links: Links,
  pathname: string
): number {
  let index: null | number = null
  let size: null | number = null

  for (const [i, link] of links.entries()) {
    if (!pathname.startsWith(link.path)) continue
    let splits = link.path.split("/").length

    if (size === null || splits > size) {
      size = splits
      index = i
    }
  }

  if (index === null) {
    throw new Error("Unable to find the proper pathname")
  }

  return index
}

export interface NavigationBarProps {
  currentPathname: string
}

export function NavigationBar(props: NavigationBarProps) {
  const currentIndex = findLinkIndexByPathname(links, props.currentPathname)

  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        {links.map((link, index) => (
          <li key={link.path} className={clsx(styles.item)}>
            <Link
              to={link.path}
              className={clsx(styles.link, {
                [styles.linkCurrent]: index === currentIndex,
              })}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
