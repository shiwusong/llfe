import React from 'react'
import Link from 'next/link'
import { Menu, Icon } from 'antd'

const Nav = () => (
	<div>
		<Menu mode="horizontal">
			<Menu.Item>
				<Link href="/">
					<a>首页</a>
				</Link>
			</Menu.Item>
			<Menu.Item>
				<Link href="/todos">
					<a>todos demo</a>
				</Link>
			</Menu.Item>
		</Menu>
	</div>
)

export default Nav
