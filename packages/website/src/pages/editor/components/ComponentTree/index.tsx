import { Tree } from 'antd';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useEditorContext } from 'store';

interface IComponentTreeProps {
}

let ComponentTree: React.FC<IComponentTreeProps> = (props) => {
	const editorStore = useEditorContext();
	const renderNode = (node: typeof editorStore.component) => {
		if (node) {
			console.log(node, 'children')
			return <Tree.TreeNode
				
				style={{ background: 'transparent' }}
				title={node.name} key={node.id}>
				{node.children?.length
					&& node.children.map(child => renderNode(child))}
			</Tree.TreeNode>
		}
	}
	return <div>
		<Tree style={{ background: 'transparent' }}
			selectedKeys={
				editorStore.activeComponent?.id ? [editorStore.activeComponent?.id] : []
			}
			blockNode
			defaultExpandAll
			onSelect={(key) => {
				const selectKey = key[0];
				editorStore.setActiveComponentById(selectKey as string)
			}}
		>
			{renderNode(editorStore.component)}
		</Tree>
	</div>
}

ComponentTree = observer(ComponentTree);
export { ComponentTree };