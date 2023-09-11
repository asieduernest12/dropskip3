import createCache from "@emotion/cache"
import { CacheProvider } from "@emotion/react"
import { Menu as MenuIcon } from "@mui/icons-material"
import {
  Box,
  Button,
  createTheme,
  CssBaseline,
  Paper,
  Stack
} from "@mui/material"
import type { PlasmoCSConfig } from "plasmo"
import { useEffect, useRef, useState } from "react"

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"],
  world: "MAIN",
  run_at: "document_end"
}

export default function ShellContainer({ children }) {
  const ref = useRef<HTMLDivElement>()
  const [show, setShow] = useState(false)

  useEffect(() => {
    setTimeout(() => setShow(true), 2_000)
  }, [])

  return (
    <Stack direction="column" ref={ref} className="shellContainer">
      <Button>dropskip</Button>
      {ref?.current ? <Content reference={ref} /> : <Button>Loading</Button>}
    </Stack>
  )
}

function Content({
  reference
}: {
  reference: ReturnType<typeof useRef<HTMLDivElement>>
}) {
  console.log("dropskipped content fired")
  // const container = document.querySelector("#shadow-root")
  console.log(reference)
  const container = reference?.current

  if (!container) {
    return <Button>No container:#shadow root</Button>
  }

  // const shadowContainer = container.attachShadow({ mode: "open" })
  const shadowContainer = container.parentNode
  const emotionRoot = document.createElement("style")
  const shadowRootElement = document.createElement("div")
  shadowContainer.appendChild(emotionRoot)
  shadowContainer.appendChild(shadowRootElement)

  const cache = createCache({
    key: "css",
    prepend: true,
    container: emotionRoot
  })

  const theme = createTheme({
    components: {
      MuiPopover: {
        defaultProps: {
          container: shadowRootElement
        }
      },
      MuiPopper: {
        defaultProps: {
          container: shadowRootElement
        }
      },
      MuiModal: {
        defaultProps: {
          container: shadowRootElement
        }
      }
    }
  })
  return (
    <Box>
      <CacheProvider value={cache}>
        <CssBaseline />
        <Paper>
          <Stack direction="column" sx={{ padding: 2, gap: 2 }}>
            <Button variant="contained" startIcon={<MenuIcon />}>
              view product only
            </Button>
            <Button>Checkout for 30% ($14.77) off</Button>
          </Stack>
        </Paper>
      </CacheProvider>
    </Box>
  )
}
