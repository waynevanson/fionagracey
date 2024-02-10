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
  let index = links.findIndex((link) => pathname.startsWith(link.path))
  if (index < 0) {
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
