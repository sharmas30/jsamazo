import { getUserInfo } from "../localStorage";

const Header = {
        render: () => {
                const { name, isAdmin } = getUserInfo();
                return `
				<div>
					<a href="/#/">SharmasWeb</a>
				</div>
				<div>
				${name ? `<a href="/#/profile">${name}</a>`
					: `<a href="/#/signin">SighIn</a>`}
				
				<a href="/#/cart">Cart</a>
				${isAdmin ? `<a href="/#/dashboard">Dashboard</a>`:''} 
				</div>
				`
				},
   				 after_render: () => {},
};

export default Header;