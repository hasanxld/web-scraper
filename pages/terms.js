import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useEffect, useState } from 'react'

export default function Terms() {
  const [websiteUrl, setWebsiteUrl] = useState('')

  useEffect(() => {
    setWebsiteUrl(window.location.origin)
  }, [])

  return (
    <>
      <Head>
        <title>Terms of Service - WebScraperAPI | Usage Guidelines</title>
        <meta name="description" content="WebScraperAPI terms of service. Understand our usage policies, API guidelines, and service terms." />
        <link rel="canonical" href={`${websiteUrl}/terms`} />
      </Head>

      <Header />

      <main className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-gray-200 rounded-lg p-6 md:p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Terms of Service</h1>
            
            <div className="prose prose-gray max-w-none">
              <p className="text-lg text-gray-600 mb-6">
                Effective date: {new Date().toLocaleDateString()}
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
                <p className="text-gray-600">
                  By accessing and using WebScraperAPI, you accept and agree to be bound by the terms 
                  and provision of this agreement.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Use License</h2>
                <p className="text-gray-600 mb-4">
                  Permission is granted to temporarily use WebScraperAPI for personal and commercial 
                  purposes. This is the grant of a license, not a transfer of title.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Acceptable Use</h2>
                <p className="text-gray-600 mb-4">You agree not to:</p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Use the service for any illegal purpose</li>
                  <li>Scrape websites that prohibit automated access</li>
                  <li>Overload or attempt to crash our services</li>
                  <li>Share API keys with unauthorized users</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray
