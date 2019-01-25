import React from 'react'
import styled from 'styled-components'

const Index = () => (
	<div>
		<Style>
			<div className="font">Welcome to llfe antd!</div>
			<div>Welcome to llfe antd!</div>
		</Style>
	</div>
)
const Style = styled.div`
	padding: 10px;
	.font {
		font-size: 20px;
		color: red;
	}
`
export default Index
