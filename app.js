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
    console.log(disease)
  }
  minutes -= disease
  updateDisplay()
}

function startInterval() {
  collectionInterval = setInterval(collectAutoUpgrades, 3000);
}

function buyItem(item) {

  for (let key in clickUpgrades) {
    if (key == item) {

      if (minutes >= clickUpgrades[key].price * (clickUpgrades[key].quantity + 1)) {
        minutes -= clickUpgrades[key].price * (clickUpgrades[key].quantity + 1)
        clickUpgrades[key].quantity++
      }
    }
  }
  updateDisplay()
}

function buyAutoItem(item) {

  for (key in autoUpgrade) {
    if (key == item) {

      if (minutes >= autoUpgrade[key].price * (autoUpgrade[key].quantity + 1)) {
        minutes -= autoUpgrade[key].price * (autoUpgrade[key].quantity + 1)
        autoUpgrade[key].quantity++
        console.log("purchased")
      } else {
        console.log("insufficent resources")
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

  document.getElementById("diabetes-price").innerHTML = `${autoUpgrade.diabetes.price * (autoUpgrade.diabetes.quantity + 1)}`

  document.getElementById("display-minutes-per-click").innerHTML = `${minutesModifier() + 1}`

  document.getElementById("display-minutes-per-sec").innerHTML = `${Math.floor(disease / 3)}`


}

updateDisplay()
startInterval()