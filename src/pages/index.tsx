import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"

export default function IndexPage(props: PageProps) {
  return (
    <section>
      <p className="my-1">Hello! Welcome to my partner's website.</p>
      <p className="my-1">
        She makes delicious food, and this website is a mix between me applying
        my technical skills and the fear of losing her without her recipes being
        passed on.
      </p>
    </section>
  )
}

export const Head: HeadFC = () => <title>Home Page</title>
