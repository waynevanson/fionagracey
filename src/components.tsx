import { Link as GatsbyLink, PageProps, navigate } from "gatsby"
import React, { forwardRef } from "react"
import {
  Heading,
  Container,
  Box,
  Link as ChakraLink,
  MergeWithAs,
  LinkProps,
} from "@chakra-ui/react"
import * as styles from "./components.module.css"

export const Link = forwardRef<
  HTMLAnchorElement,
  MergeWithAs<
    React.ComponentProps<"a">,
    React.ComponentProps<typeof GatsbyLink<any>>,
    LinkProps,
    typeof GatsbyLink<any>
  >
>((props, ref) => <ChakraLink ref={ref} as={GatsbyLink<any>} {...props} />)

const links: Array<Record<"label" | "to", string>> = [
  { label: "Home", to: "/" },
  { label: "Recipes", to: "/recipes/" },
]

export function PageLayout(props: PageProps) {
  let index = links.findIndex((link) => link.to === props.location.pathname)
  if (index < 0) {
    index = 0
  }

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
        <Box as="nav" flexGrow={1}>
          <Box as="ul" listStyleType="none" display="flex" minHeight="100%">
            {links.map((link) => (
              <Box
                as="li"
                flexGrow={1}
                display="flex"
                justifyItems="stretch"
                alignItems="stretch"
                className={styles.link}
                padding="2rem 0"
              >
                <Link
                  to={link.to}
                  minWidth="100%"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Box as="span">{link.label}</Box>
                </Link>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
      <Box as="main">{props.children}</Box>
    </Container>
  )
}
