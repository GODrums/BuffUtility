module Adjust_Settings {
	DEBUG &&
		console.debug(
			"%c■",
			"color: #0000ff",
			"[BuffUtility] Module.Adjust_Settings"
		);

	// imports
	import Settings = ExtensionSettings.Settings;
	import getSetting = ExtensionSettings.getSetting;

	// module

	async function init(): Promise<void> {
		if (!(await getSetting(Settings.MODULE_ADJUST_SETTINGS))) {
			console.debug(
				"%c■",
				"color: #ff0000",
				"[BuffUtility] Adjust_Settings - disabled"
			);
			//return;
		} else {
			console.debug(
				"%c■",
				"color: #00ff00",
				"[BuffUtility] Adjust_Settings"
			);
		}

		// Get stuff
		const myMenu = document.querySelector("div.my-menu > ul");

		const lotteryLi = <HTMLElement>document.createElement("li");
		const lotteryA = document.createElement("a");
        lotteryLi.id = "buffutility-lottery";
		lotteryA.innerHTML =
			'<i class="icon icon_menu icon_menu_gift"></i>Lottery';
		lotteryA.addEventListener("click", loadLottery);

		lotteryLi.append(lotteryA);
		myMenu.append(lotteryLi);

        if (parent.location.hash === "#lottery") {
            loadLottery(new Event("click"));
        }
	}

	async function loadLottery(e: Event) {
		e.preventDefault();

		const container = <HTMLElement>document.querySelector("div.cont_main");
        const activeLi = <HTMLElement>document.querySelector("div.my-menu > ul > li.on");
        const lotteryLi = <HTMLElement>document.querySelector("#buffutility-lottery");

        if (parent.location.hash !== "#lottery") {
		    parent.location.hash = "#lottery";
        }
        if (activeLi) {
            activeLi.classList.remove("on");
        }
        if (lotteryLi) {
            lotteryLi.classList.add("on");
        }
        if (container) {
            container.innerHTML = `<embed src="https://buff.163.com/s/lottery.html" style="width:${container.offsetWidth}px; height: ${container.offsetHeight}px;">`;
        }
	}

	init();
}
