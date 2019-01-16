import React from 'react'
import Head from 'next/head'
import Nav from '../components/nav'
export default class Layout extends React.Component {
  render() {
    return (
      <div>
        <Head>
          <link rel='stylesheet' href='https://cdn.bootcss.com/antd/3.1.3/antd.css'/>
        </Head>
        <Nav/>
        {this.props.children}
      </div>
    )
  }
}