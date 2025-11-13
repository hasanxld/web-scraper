import '../styles/globals.css'
import PremiumLoader from '../components/PremiumLoader'

export default function App({ Component, pageProps }) {
  return (
    <>
      <PremiumLoader />
      <Component {...pageProps} />
    </>
  )
}
