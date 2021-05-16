let memory = {

  minutes: 52500000,
  minutesLived: 0,
  money: 0,
  clicks: 0
}
let easterEgg = {
  adventure: false
}

let disease = 1


let clickUpgrades = {
  vapes: {
    price: 100,
    quantity: 0,
    multiplier: 1
  },
  cigarettes: {
    price: 1000,
    quantity: 0,
    multiplier: 20
  },
  cigars: {
    price: 10000,
    quantity: 0,
    multiplier: 200
  },
  chew: {
    price: 100000,
    quantity: 0,
    multiplier: 2000
  }
}

let autoUpgrade = {
  diabetes: {
    price: 500,
    quantity: 0,
    multiplier: 20
  },
  heartDisease: {
    price: 5000,
    quantity: 0,
    multiplier: 200
  },
  copd: {
    price: 50000,
    quantity: 0,
    multiplier: 2000
  },
  lungCancer: {
    price: 500000,
    quantity: 0,
    multiplier: 20000
  }
}

function intro() {
  document.getElementById("main").classList.add("d-none")
  document.getElementById("footer").classList.add("d-none")
  document.getElementById("header").classList.add("intro")
  setTimeout(showGameBtn, 8000)
}

function showGameBtn() {

  if (easterEgg?.adventure) {
    document.getElementById("adventure").classList.remove("d-none")
  }

  document.getElementById("game-btn").classList.remove("d-none")

}

function hideIntro() {
  document.getElementById("main").classList.remove("d-none")
  document.getElementById("footer").classList.remove("d-none")
  document.getElementById("header").classList.add("d-none")
}

function saveGame() {
  window.localStorage.setItem("click-upgrades", JSON.stringify(clickUpgrades))
  window.localStorage.setItem("auto-upgrades", JSON.stringify(autoUpgrade))
  window.localStorage.setItem("memory", JSON.stringify(memory))
}

function loadGame() {
  let game = JSON.parse(window.localStorage.getItem("memory"))
  egg = JSON.parse(window.localStorage.getItem("easter-egg"))
  if (egg != null) {
    easterEgg = JSON.parse(window.localStorage.getItem("easter-egg"))

  }

  if (!game) {
    intro()
  } else {
    hideIntro()
    clickUpgrades = JSON.parse(window.localStorage.getItem("click-upgrades"))
    autoUpgrade = JSON.parse(window.localStorage.getItem("auto-upgrades"))
    memory = JSON.parse(window.localStorage.getItem("memory"))

    updateDisplay()
  }
}


function smoke() {
  memory.money++
  memory.clicks++
  memory.minutes--
  memory.money += minutesModifier()
  memory.minutes -= minutesModifier()
  updateDisplay()
  toggleFlameVisibility()
  saveGame()
}

function minutesModifier() {
  let modifier = 0
  for (let key in clickUpgrades) {
    modifier += clickUpgrades[key].multiplier * clickUpgrades[key].quantity
  }
  return modifier
}

function collectAutoUpgrades() {
  disease = 1
  for (let key in autoUpgrade) {
    disease += autoUpgrade[key].multiplier * autoUpgrade[key].quantity
  }
  memory.money += disease - 1
  memory.minutes -= disease
  memory.minutesLived++
  updateDisplay()
  death()
}

function startInterval() {
  collectionInterval = setInterval(collectAutoUpgrades, 1000);
}

function buyItem(item) {

  for (let key in clickUpgrades) {
    if (key == item) {

      if (memory.money >= clickUpgrades[key].price * (clickUpgrades[key].quantity + 1)) {
        memory.money -= clickUpgrades[key].price * (clickUpgrades[key].quantity + 1)
        clickUpgrades[key].quantity++
      } else {
        window.alert("insufficent resources")
      }
    }
  }
  updateDisplay()
  displayHighUpgrades()
  saveGame()
}

function buyAutoItem(item) {

  for (key in autoUpgrade) {
    if (key == item) {

      if (memory.money >= autoUpgrade[key].price * (autoUpgrade[key].quantity + 1)) {
        memory.money -= autoUpgrade[key].price * (autoUpgrade[key].quantity + 1)
        autoUpgrade[key].quantity++
        console.log(autoUpgrade[key])
      } else {
        window.alert("insufficent resources")
      }
    }
  }
  updateDisplay()
  displayHighUpgrades()
  saveGame()
}

function updateDisplay() {
  document.getElementById("display-minutes").innerText = `${memory.minutes.toString()}`

  document.getElementById("display-money").innerText = `${memory.money.toString()}`

  document.getElementById("display-vapes").innerText = `${clickUpgrades.vapes.quantity.toString()}`

  document.getElementById("vape-price").innerHTML = `${clickUpgrades.vapes.price * (clickUpgrades.vapes.quantity + 1)}`
  document.getElementById("display-cigarettes").innerText = `${clickUpgrades.cigarettes.quantity.toString()}`

  document.getElementById("cigarette-price").innerHTML = `${clickUpgrades.cigarettes.price * (clickUpgrades.cigarettes.quantity + 1)}`
  document.getElementById("display-cigars").innerText = `${clickUpgrades.cigars.quantity.toString()}`

  document.getElementById("cigar-price").innerHTML = `${clickUpgrades.cigars.price * (clickUpgrades.cigars.quantity + 1)}`
  document.getElementById("display-chew").innerText = `${clickUpgrades.chew.quantity.toString()}`

  document.getElementById("chew-price").innerHTML = `${clickUpgrades.chew.price * (clickUpgrades.chew.quantity + 1)}`

  document.getElementById("diabetes-price").innerHTML = `${autoUpgrade.diabetes.price * (autoUpgrade.diabetes.quantity + 1)}`
  document.getElementById("display-diabetes").innerHTML = `${autoUpgrade.diabetes.quantity}`

  document.getElementById("heart-disease-price").innerHTML = `${autoUpgrade.heartDisease.price * (autoUpgrade.heartDisease.quantity + 1)}`
  document.getElementById("display-heart-disease").innerText = `${autoUpgrade.heartDisease.quantity.toString()}`

  document.getElementById("copd-price").innerHTML = `${autoUpgrade.copd.price * (autoUpgrade.copd.quantity + 1)}`
  document.getElementById("display-copd").innerText = `${autoUpgrade.copd.quantity.toString()}`

  document.getElementById("lung-cancer-price").innerHTML = `${autoUpgrade.lungCancer.price * (autoUpgrade.lungCancer.quantity + 1)}`
  document.getElementById("display-lung-cancer").innerText = `${autoUpgrade.lungCancer.quantity.toString()}`

  document.getElementById("display-minutes-per-click").innerHTML = `${minutesModifier() + 1}`

  document.getElementById("display-minutes-per-sec").innerText = `${disease.toString()}`
}

function toggleFlameVisibility() {
  document.getElementById("flame").classList.toggle("invisible")
}
function displayHighUpgrades() {
  if (clickUpgrades.cigarettes.quantity > 0 && autoUpgrade.heartDisease.quantity > 0) {
    document.getElementById("high-upgrades").removeAttribute("hidden")
  }
}

function death() {
  if (memory.minutes < 1) {
    let lifeSpan = memory.minutesLived / 60 / 24 / 364
    document.getElementById("main").classList.add("d-none")
    document.getElementById("footer").classList.add("d-none")
    document.getElementById("header").innerHTML = `<div class="row"><div class="col-6"></div> <h1 class="col-6" >you died\n
    you smoked ${memory.clicks} times \n you should have lived 100 years but instead you lived ${lifeSpan.toFixed(2)} years. Smoking kills.</h1></div>`
    document.getElementById("header").classList.remove("d-none")
    document.getElementById("body").style.backgroundImage = 'url(https://lh3.googleusercontent.com/proxy/XLCMkx-L_k-Ixqpf_7uXHfSTkcJrb_5k8hpGA57Z2cfnifwLVrwqquYLC3Y1yTQYIyREvu7TkSeFFVqH6DNkmLrkOzcqJh7nXbyx60nGXNpLVxXHdP3bUBOHJF1RgJeSTw5_uMFCeQ)';
    easterEgg.adventure = true
    window.localStorage.setItem("easter-egg", JSON.stringify(easterEgg))
    localStorage.removeItem("memory")
    localStorage.removeItem("click-upgrades")
    localStorage.removeItem("auto-upgrades")
  }
}

updateDisplay()
startInterval()
loadGame()