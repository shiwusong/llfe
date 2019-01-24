import App, { Container } from 'next/app'
import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import Stores from '../store/Stores'

const store = createStore(Stores)
export default class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  render() {
    const { Component, pageProps } = this.props
    return (
      <Provider store={store}>
        <Container>
          <Component {...pageProps} />
        </Container>
      </Provider>
    )
  }
}
