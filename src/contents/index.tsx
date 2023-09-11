import createCache from "@emotion/cache"
import { CacheProvider } from "@emotion/react"
import { Menu as MenuIcon } from "@mui/icons-material"
import { Box, Button, CssBaseline, Paper, Stack } from "@mui/material"
import ChromaGlass from "data-base64:~assets/Chroma_Glass.png"
// import CoinSvg from "data-base64:~assets/coin.svg"
// import CurrencySvg from "data-base64:~assets/currency.svg"
import type { PlasmoCSConfig, PlasmoGetStyle } from "plasmo"

export const config: PlasmoCSConfig = {
  // matches: ["*amazon.com*", "*bestbuy.com*", "<all_urls>"],
  matches: ["<all_urls>"],
  world: "MAIN",
  run_at: "document_end"
}

const styleElement = document.createElement("style")

const styleCache = createCache({
  key: "plasmo-emotion-cache",
  prepend: true,
  container: styleElement
})

export const getStyle: PlasmoGetStyle = () => styleElement

export default function ContentShell() {
  console.log("ContentShell.fired")

  return (
    <CacheProvider value={styleCache}>
      <CssBaseline />
      <Paper
        className="contentShell"
        sx={{ bottom: 0, left: 0, position: "fixed", margin: 2 }}
        elevation={2}>
        <Stack direction="column" sx={{ padding: 2, gap: 2 }}>
          <Box>
            <strong>Match Found</strong>
          </Box>
          <Button variant="contained" startIcon={<MenuIcon />}>
            view product only
          </Button>
          <Button
            sx={{
              background: `url(${ChromaGlass}) -50px 0px`,
              color: "white"
            }}>
            <strong>Checkout for 30% ($14.77) off</strong>
          </Button>
        </Stack>
      </Paper>
    </CacheProvider>
  )
}
