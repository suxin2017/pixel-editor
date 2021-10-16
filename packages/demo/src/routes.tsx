import { Switch, Route } from "react-router-dom"
import { Site } from "./pages/editor"
import Pages from "./pages/pages"

export const menu = [
	// {
	// 	name: '页面',
	// 	path: '/pages',
	// 	component: <Pages />
	// },
	{
		name: '搭建',
		path: '/editor',
		component: <Site />
	},
]

export const RouterSwitch = () => {
	return <Switch>
		{menu.map(item => {
			return <Route path={item.path} key={item.path}>
				{item.component}
			</Route>
		})}
	</Switch>
}