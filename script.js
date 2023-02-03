// JavaScript Document

function checkRange(maxSub, minSub, realSub) {
	//if there is no value OR if there are 2 values in between OR if the min value is smaller OR if the max value is bigger (very long so i broke it up into multiple if statements to better digest)
	
	//if there are no values for either max or min (blank)
	if (!(maxSub) && !(minSub)) {
//		alert("no max or min");
		return true;
	}
	//if there is a max and a min and they're in between
	else if (maxSub && minSub && realSub >= minSub && realSub <= maxSub) {
//		alert("in between");
		return true;
	}
	//if there is no max but there is a min and it's smaller
	else if (!(maxSub) && minSub && realSub >= minSub) {
//		alert("only min");
		return true;
	}
	//if there is no min but there is a max and it's bigger
	else if (!(minSub) && maxSub && realSub <= maxSub) {
//		alert("only max");
		return true;
	}
	else {
//		alert("wrong!");
		return false;
	}
}

function updateList() {
	//all filter inputs
	const checkboxes = document.querySelectorAll("details input[type=checkbox]");
	const ranges = document.querySelectorAll("details input[type=number]");
	//all cars in list with class of caritem
	const cars = document.querySelectorAll("div.caritem");
	const empty = document.getElementById("div-empty");
	
	let carsObj = {
		make: [],
		year: {minYear: null, maxYear: null},
		price: {minPrice: null, maxPrice: null},
		mileage: {minMileage: null, maxMileage: null},
		mpg: {minMPG: null, maxMPG: null},
		color: [],
	};
	
	//disables all cars to enable later through checking checkboxes
	for (let i = 0; i < cars.length; i++) {
		cars[i].style.display = "none";
	}
	
	//goes through each checkbox, checks if checked
	for (let i = 0; i < checkboxes.length; i++) {
		if (checkboxes[i].checked === true) {
			//finds the category of the filter
			let objSub = checkboxes[i].parentElement.parentElement.id.replace("det-","");
			
			//adds to category of the object to create the filter list
			carsObj[objSub].push(checkboxes[i].name);
		}
	}
	
	//goes through the ranges, checks if theres something there
	for (let i = 0; i < ranges.length; i++) {
		if (ranges[i].value) {
			let objSub = ranges[i].parentElement.parentElement.id.replace("det-","");
			carsObj[objSub][ranges[i].name] = (ranges[i].value);
		}
	}
	
	for (let i = 0; i < cars.length; i++) {
		let classList = Array.from(cars[i].classList);
		
	//	alert(JSON.stringify(carsObj, null, 4));
		
		//ex for price for 1 car: Info = price12345, Num = 12345
		const yearInfo = cars[i].classList[2];
		const yearNum = Number(yearInfo.replace("year",""));
		
		const priceInfo = cars[i].classList[3];
		const priceNum = Number(priceInfo.replace("price",""));
		
		const mileageInfo = cars[i].classList[4];
		const mileageNum = Number(mileageInfo.replace("mileage",""));
		
		const mpgInfo = cars[i].classList[5];
		const mpgNum = Number(mpgInfo.replace("mpg",""));
		
		//check make
		if ((carsObj["make"].length === 0) || (carsObj["make"].includes(classList[1]))) {
			//check color
			if ((carsObj["color"].length === 0) || (carsObj["color"].includes(classList[6]))) {
				//check year
				if (checkRange(carsObj["year"].maxYear, carsObj["year"].minYear, yearNum)===true) {
					//check price
					if (checkRange(carsObj["price"].maxPrice, carsObj["price"].minPrice, priceNum)===true) {
						//check mileage
						if (checkRange(carsObj["mileage"].maxMileage, carsObj["mileage"].minMileage, mileageNum)===true) {
							//check mpg (hiway)
							if (checkRange(carsObj["mpg"].maxMPG, carsObj["mpg"].minMPG, mpgNum)===true) {
								cars[i].style.display = "block";
							}
						}
					}
				}
			}
		}
	}
	
	//display message if there are no cars showing :)
	let j = 0
	for (let i = 0; i < cars.length; i++) {
		if (cars[i].style.display === "block") {
			j++
		}
	}
	//if no cars are showing
	if (j === 0) {
		empty.style.display = "block";
	}
	else {
		empty.style.display = "none";
	}
}

function sortBy() {
	const container = document.getElementById("div-carlist");
	const cars = document.querySelectorAll("div.caritem");
	const selected = document.getElementById("sortby").selectedIndex;

	let carsList = [];
	for (let i = 0; i < cars.length; i++) {
		carsList.push(cars[i].id)
	}
	
	if (selected===0 || selected===1) {
		let objSort = {};
		for (let i = 0; i < cars.length; i++) {
			let string = cars[i].classList[3]
			objSort[cars[i].id] = Number(string.replace("price", ""));
		}
		carsList.sort(function (a, b) {
			const aa = objSort[a];
			const bb = objSort[b];
			return aa > bb ? 1 : (aa < bb ? -1 : 0);
		});
	}
	
	if (selected===2 || selected===3) {
		let objSort = {};
		for (let i = 0; i < cars.length; i++) {
			let string = cars[i].classList[4]
			objSort[cars[i].id] = Number(string.replace("mileage", ""));
		}
		carsList.sort(function (a, b) {
			const aa = objSort[a];
			const bb = objSort[b];
			return aa > bb ? 1 : (aa < bb ? -1 : 0);
		});
	}
	
	if (selected===4 || selected===5) {
		let objSort = {};
		for (let i = 0; i < cars.length; i++) {
			let string = cars[i].classList[2]
			objSort[cars[i].id] = Number(string.replace("year", ""));
		}
		carsList.sort(function (a, b) {
			const aa = objSort[a];
			const bb = objSort[b];
			return aa > bb ? 1 : (aa < bb ? -1 : 0);
		});
	}
	
	
	
	if (selected % 2 === 0) {
		carsList.reverse();
	}
	
	for (let i = 0; i < carsList.length; i++) {
		let carMove = document.getElementById(carsList[i]);
		container.insertBefore(carMove, container.firstChild);
	}
}

function calculateMonth() {
	const price = Number(document.getElementById("m-price").value);
	const down = Number(document.getElementById("m-down").value);
	const months = Number(document.getElementById("m-months").value);
	const apr = Number(document.getElementById("m-APR").value);
	const mApr = ((apr/100)/12);

	let monthlyPayment = ((price-down)*(mApr)) / (1 - (Math.pow((1+mApr),-months)));
	const heading = document.getElementById("h-month");
	
	if (price && down && months && apr) {
		monthlyPayment = monthlyPayment.toFixed(2);
		heading.innerHTML = "Your monthly payment is: $" + monthlyPayment;
	}
}

function calculateBuying() {
	const monthly = Number(document.getElementById("b-mpay").value);
	const down = Number(document.getElementById("b-down").value);
	const months = Number(document.getElementById("b-months").value);
	const apr = Number(document.getElementById("b-APR").value);
	const mApr = ((apr/100)/12);

	let buyingPower = ((monthly*(1-Math.pow(1+mApr,-months)))/mApr)+down;
	const heading = document.getElementById("h-power");
	
	if (monthly && down && months && apr) {
		buyingPower = buyingPower.toFixed(2);
		heading.innerHTML = "Your buying power is: $" + buyingPower;
	}
}

function clearFilter() {
	const checkboxes = document.querySelectorAll("details input[type=checkbox]");
	const ranges = document.querySelectorAll("details input[type=number]");
	
	for (let i = 0; i < checkboxes.length; i++) {
		checkboxes[i].checked = false;
	}
	
	for (let i = 0; i < ranges.length; i++) {
		ranges[i].value = "";
	}
	
	updateList();
}

function updateInv() {
	updateList();
	window.scrollTo(0,0);
}

function showImages(car) {
	const background = document.getElementById("div-galleryholder");
	const modal = document.getElementById("div-gallery");
	const left = document.getElementById("left-arrow");
	const right = document.getElementById("right-arrow");
	const imgUrl = "images/Webpage Files/"+car
	
	let carImgs = [imgUrl+" Front.jpg", imgUrl+" Back.jpg", imgUrl+" Side.jpg", imgUrl+" Dash.jpg", imgUrl+" Interior.jpg"];
	background.style.display = "block";
	
	let j = 0;
	modal.style.backgroundImage = "url('"+carImgs[j]+"')";
	
	
	right.onclick = function() {
		if (j===4) {
			j = 0;
		} else {
			j += 1;
		}
		modal.style.backgroundImage = "url('"+carImgs[j]+"')";
	}
	
	left.onclick = function() {
		if (j===0) {
			j = 4;
			modal.style.backgroundImage = "url('"+carImgs[j]+"')";
		} else {
			j -= 1;
			modal.style.backgroundImage = "url('"+carImgs[j]+"')";
		}
	}
}

function openAvail(car, fnc) {
	const background = document.getElementById("div-available");
	const top = document.getElementById("p-avail-to");
	const forp = document.getElementById("p-avail-for");
	
	top.innerHTML = fnc;
	forp.innerHTML = car;
	background.style.display = "block";
}

function closeImages() {
	const modal = document.getElementById("div-galleryholder");
	
	modal.style.display = "none";
}

function closeAvail() {
	const modal = document.getElementById("div-available");
	
	modal.style.display = "none";
}

function sendAvail() {
	const email = document.getElementById("inemail");
	const car = document.getElementById("p-avail-for");
	const todo = document.getElementById("p-avail-to");

	const request = new XMLHttpRequest();
	let wurl = "https://discord.com/api/webhooks/1070553535583883394/98I-QXmc7UNiEju4j2dfFNJYKRcvbx5BvioTVnbetEOBBp5viYAS4eshXVam6EpPFhV6H";
	wurl = wurl.slice(0,-1);
	
	request.open("POST", wurl, true);
	
	request.setRequestHeader('Content-Type', 'application/json');
	
	request.send(JSON.stringify({
		username: "Safe Park Motors Bot",
		content: "[BEGIN MESSAGE]\n**New Request: **"+todo.innerHTML+"\n**Email: **"+email.value+"\n**Car: **"+car.innerHTML+"\n[END MESSAGE]",
	}));
	
	alert("Your message has been sent!");
}

function openList() {
	const navList = document.getElementById("div-navsm-list");
	const navImg = document.getElementById("navsm-img");
	
	if (navList.style.display === "block") {
		//close
		navImg.style.content = 'url("images/Webpage Files/lines.png")';
		navList.style.display = "none";
	} else {
		//open
		navList.style.display = "block";
		navImg.style.content = 'url("images/Webpage Files/x.png")';
	}
}

function openFilter() {
	const filter = document.getElementById("filterid");
	const body = document.body;
	
	if (filter.style.display === "none") {
		//open filter
		filter.style.display = "block";
		body.classList.add("stopscrolling");
	} else {
		//close filter
		filter.style.display = "none";
		body.classList.remove("stopscrolling");
	}
}

function sendEmail() {
	const fName = document.getElementById("first");
	const lName = document.getElementById("last");
	const fullName = fName.value+" "+lName.value;
	const phone = document.getElementById("phone");
	const email = document.getElementById("email");
	const comment = document.getElementById("comments");

	const request = new XMLHttpRequest();
	let wurl = "https://discord.com/api/webhooks/1070093287928627321/SGrZaXrK4buS3sCXGkK3KhOhBvlgC6MJaWbj819ZMim8Pf41WWMUIfsZDuAoirA8MCEiM";
	wurl = wurl.slice(0,-1);
	
	request.open("POST", wurl, true);
	
	request.setRequestHeader('Content-Type', 'application/json');
	
	request.send(JSON.stringify({
		username: "Safe Park Motors Bot",
		content: "[BEGIN MESSAGE]\n**You have a new message from: **"+fullName+"\n**Phone Number: **"+phone.value+"\n**Email: **"+email.value+"\n**Comments: **"+comment.value+"\n[END MESSAGE]",
	}));
	
	alert("Your message has been sent!");
}

function sendTrade() {
	const fName = document.getElementById("first");
	const lName = document.getElementById("last");
	const fullName = fName.value+" "+lName.value;
	const phone = document.getElementById("phone");
	const email = document.getElementById("email");
	const year = document.getElementById("year");
	const make = document.getElementById("make");
	const model = document.getElementById("model");
	const car = year.value+" "+make.value+" "+model.value;

	const request = new XMLHttpRequest();
	let wurl = "https://discord.com/api/webhooks/1070105246279417986/xUdDwyNI-HcfpQfJ2AHCZlPn-bXr03hgmyMuQPY29AjiM1L8L4elccenjQh-F4vARFOOD";
	wurl = wurl.slice(0,-1);
	
	request.open("POST", wurl, true);
	
	request.setRequestHeader('Content-Type', 'application/json');
	
	request.send(JSON.stringify({
		username: "Safe Park Motors Bot",
		content: "[BEGIN MESSAGE]\n**You have a new trade request from: **"+fullName+"\n**Phone Number: **"+phone.value+"\n**Email: **"+email.value+"\n**Car: **"+car+"\n[END MESSAGE]",
	}));
	
	alert("Your message has been sent!");
}

if (document.title) {
	
	const d = new Date();
	let day = d.getDay();
	
	const trDay = document.getElementsByClassName("day");
	const trTime = document.getElementsByClassName("time");

	if (day != 0) {
		day = day-1
		trDay[day].style.textDecoration = "underline";
		trTime[day].style.textDecoration = "underline";
	} else if(day===0) {
		day = 6
		trDay[day].style.textDecoration = "underline";
		trTime[day].style.textDecoration = "underline";
	}
}

if (document.title==="Safe Park Motors | Payment Calculator") {
	const hashParams = window.location.hash.substr(1);
	const p = hashParams.split("=");
	
	document.getElementById(p[0]).value = Number(p[1]);
}

if (document.title==="Safe Park Motors | Inventory") {
	const p = window.location.hash.substr(1);
	
	document.getElementById(p).checked = true;
	
	setTimeout(updateInv, 600);
}