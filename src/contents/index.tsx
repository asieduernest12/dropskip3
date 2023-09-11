import createCache from "@emotion/cache"
import { CacheProvider } from "@emotion/react"
import { Menu as MenuIcon } from "@mui/icons-material"
import { Box, Button, CssBaseline, Paper, Stack } from "@mui/material"
import ChromaGlass from "data-base64:~assets/Chroma_Glass.png"
import CoinSvg from "data-base64:~assets/coins.svg"
import CurrencySvg from "data-base64:~assets/currency.svg"
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
        sx={{
          bottom: 0,
          left: 0,
          position: "fixed",
          margin: 2,
          backgroundColor: "black",
          color: "#fff",
          width: "430px",
          height: "270px"
        }}
        elevation={2}>
        <Stack
          direction="column"
          sx={{ padding: 2, gap: 2, position: "relative", height: "100%" }}>
          <Stack
            direction="row"
            sx={{
              color: "white",
              justifyContent: "start",
              alignItems: "center",
              marginBottom: "auto"
            }}>
            <Box
              sx={{
                background: `url(${CurrencySvg}) no-repeat center`,
                height: "40px",
                width: "40px"
              }}></Box>
            <strong>Match Found</strong>
          </Stack>
          <Box
            sx={{
              height: "200px",
              width: "200px",
              background: `url(${CoinSvg}) no-repeat center`,
              position: "absolute",
              right: 0,
              top: 0,
              zIndex: "-1"
            }}></Box>
          <Button variant="contained" startIcon={<MenuIcon />} size="large">
            view product only
          </Button>
          <Button
            size="large"
            sx={{
              background: `url(${ChromaGlass}) -50px 0px / 460px 50px`,
              color: "white"
            }}>
            <strong>Checkout for 30% ($14.77) off</strong>
          </Button>
        </Stack>
      </Paper>
    </CacheProvider>
  )
}
