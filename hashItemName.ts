import { stringToCharSum } from "./stringToCharSum";
import { getInitials } from "./getInitials";

export function hashItemName(item: string): string {
	return stringToCharSum(item.replace(/[^a-zA-Z]/g, '')) + getInitials(item)
}
