let loot = 0

let clickUpgrades = {
  swords: {
    price: 10,
    quantity: 0,
    multiplier: 2
  },
  longSwords: {
    price: 1000,
    quantity: 0,
    multiplier: 20
  },
  greatSwords: {
    price: 10000,
    quantity: 0,
    multiplier: 200
  }
}

let autoUpgrade = {
  temp: {
    price: 500,
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
  displayLoot()
}

function lootModifier() {
  let modifier = clickUpgrades.swords.multiplier * (clickUpgrades.swords.quantity)
  return modifier
}

function displayLoot() {
  document.getElementById("display-loot").innerHTML = `${loot}`
  document.getElementById("display-swords").innerHTML = `${clickUpgrades.swords.quantity}`
  document.getElementById("swords-price").innerHTML = `${clickUpgrades.swords.price * (clickUpgrades.swords.quantity + 1)}`
  document.getElementById("display-loot-per-click").innerHTML = `${lootModifier() + 1}`
}


function buySword() {
  if (loot >= clickUpgrades.swords.price * (clickUpgrades.swords.quantity + 1)) {
    loot -= clickUpgrades.swords.price * clickUpgrades.swords.quantity
    clickUpgrades.swords.quantity++
    console.log("purchased")
  } else {
    console.log("insufficent resources")
  }
  displayLoot()
}
displayLoot()