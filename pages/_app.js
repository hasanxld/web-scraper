import '../styles/globals.css'
import PremiumTopLoader from '../components/PremiumTopLoader'

export default function App({ Component, pageProps }) {
  return (
    <>
      <PremiumTopLoader />
      <Component {...pageProps} />
    </>
  )
}
