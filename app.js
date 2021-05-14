let loot = 0

let clickUpgrades = {
  swords: {
    price: 10,
    quantity: 0,
    multiplier: 1
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

// let template = ''

// for (let key in toppings){
//   let topping = toppings[key]
//   template += `
//     <div class="col-4 text-center">
//       <img class="img-fluid"
//         src="${topping.imgUrl}"
//         alt="">
//       <button class="btn btn-primary btn-block" onclick="addItem('${topping.name}')"> ${topping.name}</button>
//       <p>$${topping.price.toFixed(2)}</p>
//     </div>`

function lootModifier() {
  let modifier = 0
  for (let key in clickUpgrades) {
    let upgrade = clickUpgrades
  }
  return modifier
}

function collectAutoUpgrades() {
  let autoLoot = 0
  for (i = 0; i < autoUpgrade.length; i++) {
    autoLoot += autoUpgrade[i].multiplier * autoUpgrade[i].quantity
  }
  startInterval()
}

function startInterval() {
  collectionInterval = setInterval(collectAutoUpgrades, 3000);
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