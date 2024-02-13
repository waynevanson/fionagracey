import React from "react"
import { Link } from "./link"

type Links = Array<Record<"label" | "path", string> & { external?: true }>

const links: Links = [{ label: "Admin", path: "/admin", external: true }]

export function Footer() {
  return (
    <nav>
      <ul>
        {links.map((link) => (
          <li key={link.label}>
            <Link href={link.path} external={link.external}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
