import React from 'react'

import Market from './Market'
import Faction from './Faction'
import Bazaar from './Bazaar'

function Toolbar() {
	return (
		<div>
			<style>{`
			.sticky-parent {
				position: relative;
				height: 100%;
			}

			.sticky-parent > .sticky-child {
				position: sticky;
				top: 0;
				padding: 0.5rem;
			}

			.menu {
				background-color: rgb(242, 242, 242);
				width: 10rem;
				border-radius: 0 5px 5px 0;
			}
		`}</style>
			<div class="sticky-parent">
				<div class="sticky-child">
					{(() => {
						switch (window.location.pathname) {
							case '/imarket.php':
								return <Market class="menu" />
							case '/factions.php':
								return <Faction class="menu" />
							case '/bazaar.php':
								return <Bazaar class="menu" />
							default:
								return null
						}
					})()}
				</div>
			</div>
		</div>
	)
}

export default Toolbar
