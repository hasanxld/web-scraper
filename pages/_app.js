import '../styles/globals.css'
import LoadingBar from '../components/LoadingBar'

export default function App({ Component, pageProps }) {
  return (
    <>
      <LoadingBar />
      <Component {...pageProps} />
    </>
  )
}
