import Toro from "@/assets/toro.webp";

function Nav() {
	return (
		<nav class="flex justify-center p-6 max-w-2xl mx-auto">
			<h1 class="text-4xl font-black text-white">
				<a href="/" class="flex items-center">
					<img
						alt="tuna nigiri"
						draggable={false}
						src={Toro}
						class="h-12 w-12 mr-2"
					/>
					PomoToro
				</a>
			</h1>
		</nav>
	);
}

export default Nav;
