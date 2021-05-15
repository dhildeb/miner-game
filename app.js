let minutes = 52500000
let money = 0
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

function smoke() {
  money++
  minutes--
  money += minutesModifier()
  minutes -= minutesModifier()
  updateDisplay()
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
  money += disease - 1
  minutes -= disease
  updateDisplay()
}

function startInterval() {
  collectionInterval = setInterval(collectAutoUpgrades, 1000);
}

function buyItem(item) {

  for (let key in clickUpgrades) {
    if (key == item) {

      if (money >= clickUpgrades[key].price * (clickUpgrades[key].quantity + 1)) {
        money -= clickUpgrades[key].price * (clickUpgrades[key].quantity + 1)
        clickUpgrades[key].quantity++
      } else {
        window.alert("insufficent resources")
      }
    }
  }
  updateDisplay()
}

function buyAutoItem(item) {

  for (key in autoUpgrade) {
    if (key == item) {

      if (money >= autoUpgrade[key].price * (autoUpgrade[key].quantity + 1)) {
        money -= autoUpgrade[key].price * (autoUpgrade[key].quantity + 1)
        autoUpgrade[key].quantity++
        console.log(autoUpgrade[key])
      } else {
        window.alert("insufficent resources")
      }
    }
  }
  updateDisplay()
}

function updateDisplay() {
  document.getElementById("display-minutes").innerText = `${minutes.toString()}`

  document.getElementById("display-money").innerText = `${money.toString()}`

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

updateDisplay()
startInterval()