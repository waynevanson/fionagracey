import React from "react"
import * as styles from "./navigation-bar.module.scss"
import { clsx } from "clsx"
import { Link } from "./link"

type Links = Array<Record<"label" | "path", string> & { external?: true }>

const links: Links = [
  { label: "Home", path: "/" },
  { label: "Recipes", path: "/recipes/" },
  { label: "Admin", path: "/admin", external: true },
]

export interface NavigationBarProps {
  currentPathname: string
}

export function NavigationBar(props: NavigationBarProps) {
  const currentIndex = findLinkIndexByPathname(links, props.currentPathname)

  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        {links.map((link, index) => {
          return (
            <li key={link.path} className={clsx(styles.item)}>
              <Link
                href={link.path}
                className={clsx(styles.link, {
                  [styles.linkCurrent]: index === currentIndex,
                })}
                external={link.external}
              >
                <span className={styles.label}>{link.label}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

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
