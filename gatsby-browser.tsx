import { GatsbyBrowser } from "gatsby"
import "./src/global.sass"
import React from "react"
import { PageLayout } from "./src/components"

export const wrapPageElement: GatsbyBrowser["wrapPageElement"] = ({
  element,
  props,
}) => {
  return <PageLayout {...props}>{element as never}</PageLayout>
}
