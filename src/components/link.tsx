import React, { ComponentProps } from "react"
import { Link as GatsbyLink } from "gatsby"

export interface LinkProps extends Omit<ComponentProps<"a">, "ref"> {
  href: string
  external?: boolean
}

export function Link(props: LinkProps) {
  const { external, href, ...rest } = props
  return !!external ? (
    <a href={href} {...rest} />
  ) : (
    <GatsbyLink to={href} {...rest} />
  )
}
