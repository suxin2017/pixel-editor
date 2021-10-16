import { ComponentStore } from "../render/componentStore";
import { dsf } from "./dsf";

/**
 * 
 * @param component 组件
 * @param root 根节点
 */
export function find(
	component: ComponentStore,
	root: ComponentStore
): ComponentStore | undefined;
/**
 * 
 * @param id id
 * @param root 跟节点
 */
export function find(id: string, root: ComponentStore): ComponentStore | undefined;
export function find(component: ComponentStore | string, root: ComponentStore) {
	let id: string;
	if (typeof component === "string") {
		id = component;
	} else {
		id = component.id;
	}
	let result: ComponentStore | undefined;
	dsf(root, (com) => {
		if (com.id === id) {
			result = com;
		}
	});
	return result;
}