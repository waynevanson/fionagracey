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
      <ul className="flex flex-grow gap-2 justify-stretch items-start">
        {links.map((link) => (
          <li key={link.path} className="flex flex-grow justify-stretch">
            <Link
              href={link.path}
              external={link.external}
              className="flex flex-grow justify-center items-center py-2 px-4 rounded-3xl bg-slate-200 outline-offset-2 focus:bg-slate-300"
            >
              <span>{link.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
