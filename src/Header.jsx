import './Header.css';

function Header() {
	//TODO Add Light and Dark Mode support
	//TODO Contact page with leadership contancts as well as discord as stuff
	//TODO Gamejams with winning projects
	//TODO transitions between pages
	return(
		<header>
			<h1>Mines GameDev Club </h1>
			<nav>
				<ul>
					<li><a className="Home" href="#">Home</a></li>
					<li><a className="Contact" href="#">Contact</a></li>
					<li><a className="Jams" href="#">Jams</a></li>
				</ul>
			</nav>
		</header>
	);
}

export default Header
