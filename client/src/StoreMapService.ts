const sourceHostnames = ["amazon.com", "bestbuy.com", "bethbathsandbeyound.com"]

interface StoreDefinition {
  hostname: string
  titleSelector: string
  priceSelector: string
  currencySelector: string
}

type IDocument = typeof document

function getTitlePriceCurrency(
  {
    titleSelector,
    priceSelector,
    currencySelector
  }: { titleSelector: string; priceSelector: string; currencySelector: string },
  doc: IDocument
) {
  return {
    title: doc.querySelector(titleSelector)?.textContent,
    price: doc.querySelector(priceSelector)?.textContent,
    currency: doc.querySelector(currencySelector)?.textContent
  }
}

const createDefinitions = (
  hostname,
  titleSelector,
  priceSelector,
  currencySelector
) => ({ hostname, titleSelector, priceSelector, currencySelector })
//define new stores here and add to the stores map
const stores: StoreDefinition[] = [
  {
    hostname: "amazon.com",
    titleSelector: "#productTitle",
    priceSelector:
      "#corePriceDisplay_desktop_feature_div > div.a-section.a-spacing-none.aok-align-center > span.a-price.aok-align-center.reinventPricePriceToPayMargin.priceToPay > span.a-offscreen",
    currencySelector:
      "#corePriceDisplay_desktop_feature_div > div.a-section.a-spacing-none.aok-align-center > span.a-price.aok-align-center.reinventPricePriceToPayMargin.priceToPay > span:nth-child(2) > span.a-price-symbol"
  },
  createDefinitions(
    "bestbuy.com",
    "div.sku-title",
    "div.pricing-price > div > div > div:nth-child(1) > div:nth-child(2) > div > div > div.price-sale-message > div:nth-child(1) > div > span:nth-child(1)",
    "div.pricing-price > div > div > div:nth-child(1) > div:nth-child(2) > div > div > div.price-sale-message > div:nth-child(1) > div > span:nth-child(1)"
  )
]

const getTitlePriceCurrencyFactory = (store, doc: IDocument) => () => {
  return getTitlePriceCurrency(store, doc)
}

const registerStores = (document) => {
  return stores.map(({ hostname, ...store }) => ({
    hostname,
    getProduct: getTitlePriceCurrencyFactory(store, document)
  }))
}

const getStoreMap = (doc: IDocument) => {
  return registerStores(doc).find(({ hostname }) =>
    new RegExp(hostname, "i").test(document.location.hostname)
  )
}
export default getStoreMap
