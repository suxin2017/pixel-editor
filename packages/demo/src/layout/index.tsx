import { Layout, Menu } from 'antd';
import { Header, Content, Footer } from 'antd/lib/layout/layout';
import Sider from 'antd/lib/layout/Sider';
import React from 'react';
import { menu, RouterSwitch } from '../routes';
import {
	Link
} from "react-router-dom";

const PageLayout: React.FC = () => {
	return <Layout>
		<Header>
			<Menu theme="dark" mode="horizontal">
				{menu.map(item => {
					return <Menu.Item key={item.path}>
						<Link to={item.path}>
							{item.name}
						</Link>
					</Menu.Item>
				})}
			</Menu>
		</Header>
		<Layout>
			<Content style={{minHeight:'calc(100vh - 64px)'}}>
				<RouterSwitch />
			</Content>
		</Layout>
	</Layout>
}

export default PageLayout