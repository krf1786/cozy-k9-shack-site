import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'

import Header     from './components/Header.jsx'
import Footer     from './components/Footer.jsx'
import CtaBanner  from './components/CtaBanner.jsx'
import WalkingDog from './components/WalkingDog.jsx'

import Home     from './pages/Home.jsx'
import Services from './pages/Services.jsx'
import About    from './pages/About.jsx'
import Pricing  from './pages/Pricing.jsx'
import Contact  from './pages/Contact.jsx'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function Layout() {
  const { pathname } = useLocation()
  const hideCta = pathname === '/about' || pathname === '/pricing' || pathname === '/contact'

  return (
    <>
      <WalkingDog />
      <Header />
      <main>
        <Routes>
          <Route path="/"         element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about"    element={<About />} />
          <Route path="/pricing"  element={<Pricing />} />
          <Route path="/contact"  element={<Contact />} />
          <Route path="*"         element={<Home />} />
        </Routes>
        {!hideCta && <CtaBanner />}
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Layout />
    </BrowserRouter>
  )
}
