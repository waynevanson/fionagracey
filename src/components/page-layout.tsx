import { Link as GatsbyLink, PageProps } from "gatsby"
import React, { forwardRef } from "react"
import {
  Heading,
  Container,
  Box,
  Link as ChakraLink,
  MergeWithAs,
  LinkProps,
} from "@chakra-ui/react"
import * as styles from "./page-layout.module.scss"
import { NavigationBar } from "./navigation-bar"

export const Link = forwardRef<
  HTMLAnchorElement,
  MergeWithAs<
    React.ComponentProps<"a">,
    React.ComponentProps<typeof GatsbyLink<any>>,
    LinkProps,
    typeof GatsbyLink<any>
  >
>((props, ref) => <ChakraLink ref={ref} as={GatsbyLink<any>} {...props} />)

export function PageLayout(props: PageProps) {
  return (
    <Container as="div" maxWidth="60rem">
      <Box
        as="header"
        display="flex"
        gap="2rem"
        padding="0 2rem"
        alignItems="center"
      >
        <Heading as="h1">Fiona Gracey</Heading>
        <NavigationBar currentPathname={props.location.pathname} />
      </Box>
      <Box as="main">{props.children}</Box>
    </Container>
  )
}
