let loot = 0
let autoLoot = 0

let clickUpgrades = {
  daggers: {
    price: 10,
    quantity: 0,
    multiplier: 1
  },
  greatswords: {
    price: 1000,
    quantity: 0,
    multiplier: 20
  },
  fireswords: {
    price: 10000,
    quantity: 0,
    multiplier: 200
  }
}

let autoUpgrade = {
  temp: {
    price: 50,
    quantity: 0,
    multiplier: 20
  },
  adventurer: {
    price: 5000,
    quantity: 0,
    multiplier: 200
  },
  thief: {
    price: 50000,
    quantity: 0,
    multiplier: 2000
  },
}

function looting() {
  loot++
  loot += lootModifier()
  updateDisplay()
}

function lootModifier() {
  let modifier = 0
  for (let key in clickUpgrades) {
    modifier += clickUpgrades[key].multiplier * clickUpgrades[key].quantity
  }
  return modifier
}

function collectAutoUpgrades() {
  autoLoot = 0
  for (let key in autoUpgrade) {
    autoLoot += autoUpgrade[key].multiplier * autoUpgrade[key].quantity
    console.log(autoLoot)
  }
  loot += autoLoot
  updateDisplay()
}

function startInterval() {
  collectionInterval = setInterval(collectAutoUpgrades, 1000);
}

function buyItem(item) {

  for (let key in clickUpgrades) {
    if (key == item) {

      if (loot >= clickUpgrades[key].price * (clickUpgrades[key].quantity + 1)) {
        loot -= clickUpgrades[key].price * (clickUpgrades[key].quantity + 1)
        clickUpgrades[key].quantity++
      }
      updateDisplay()
    }
  }
}

function buyAutoItem(item) {

  for (key in autoUpgrade) {
    if (key == item) {

      if (loot >= autoUpgrade[key].price * (autoUpgrade[key].quantity + 1)) {
        loot -= autoUpgrade[key].price * (autoUpgrade[key].quantity + 1)
        autoUpgrade[key].quantity++
        console.log("purchased")
      } else {
        console.log("insufficent resources")
      }
      updateDisplay()
    }
  }
}

function updateDisplay() {
  document.getElementById("display-loot").innerText = `${loot.toString()}`

  document.getElementById("display-dagger").innerText = `${clickUpgrades.daggers.quantity.toString()}`

  document.getElementById("dagger-price").innerHTML = `${clickUpgrades.daggers.price * (clickUpgrades.daggers.quantity + 1)}`
  document.getElementById("display-greatsword").innerText = `${clickUpgrades.greatswords.quantity.toString()}`

  document.getElementById("greatsword-price").innerHTML = `${clickUpgrades.greatswords.price * (clickUpgrades.greatswords.quantity + 1)}`
  document.getElementById("display-firesword").innerText = `${clickUpgrades.fireswords.quantity.toString()}`

  document.getElementById("firesword-price").innerHTML = `${clickUpgrades.fireswords.price * (clickUpgrades.fireswords.quantity + 1)}`

  document.getElementById("temp-price").innerHTML = `${autoUpgrade.temp.price * (autoUpgrade.temp.quantity + 1)}`

  document.getElementById("display-loot-per-click").innerHTML = `${lootModifier() + 1}`

  document.getElementById("display-loot-per-sec").innerText = `${autoLoot.toString()}`


}

updateDisplay()
startInterval()