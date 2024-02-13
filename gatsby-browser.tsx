import "./src/global.css"
import { GatsbyBrowser } from "gatsby"
import React from "react"
import { PageLayout } from "./src/components"

export const wrapPageElement: GatsbyBrowser["wrapPageElement"] = ({
  element,
  props,
}) => {
  return <PageLayout {...props}>{element as never}</PageLayout>
}
