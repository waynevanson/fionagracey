import { GatsbyBrowser } from "gatsby"
import "./src/styles/global.css"
import React, { CSSProperties } from "react"
import { PageLayout } from "./src/components"

export const wrapPageElement: GatsbyBrowser["wrapPageElement"] = ({
  element,
  props,
}) => {
  return <PageLayout {...props}>{element}</PageLayout>
}
