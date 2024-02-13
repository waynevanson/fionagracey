import React from "react"
import { Link } from "./link"

type Links = Array<Record<"label" | "path", string> & { external?: true }>

const links: Links = [
  { label: "Home", path: "/" },
  { label: "Recipes", path: "/recipes/" },
]

export function NavigationBar() {
  return (
    <nav className="flex">
      <ul className="flex flex-grow gap-2 justify-stretch items-stretch">
        {links.map((link) => (
          <li key={link.path} className="flex flex-grow justify-stretch">
            <Link
              href={link.path}
              external={link.external}
              className="flex flex-grow justify-center items-center py-0 px-4 rounded-md bg-stone-400"
            >
              <span>{link.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
