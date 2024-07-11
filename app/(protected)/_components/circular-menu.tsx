import { Menu, MenuItem, SubMenu } from "@spaceymonk/react-radial-menu";
import { useState } from "react";

export const CircularMenu = () => {
	const [show, setShow] = useState(false);
	return (
		<div className="fixed bottom-3 right-3 bg-red-300">
			<Menu show={show} innerRadius={75} outerRadius={150} centerX={150} centerY={150} drawBackground={true}>
				<MenuItem onItemClick={() => setShow(false)}>Click to close menu</MenuItem>
				<MenuItem onItemClick={() => {}}>but not here</MenuItem>
			</Menu>
		</div>
	);
};
