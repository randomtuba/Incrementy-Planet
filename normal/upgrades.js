const UPGRADE={
  1:{
    title:"Generator Enhancer",
    desc:"Incrementy Generator effectiveness is squared (before the multiplier).",
    cost(){return new Decimal(1e140)},
  },
  2:{
    title:"Pride in Expense",
    desc:"Gain more incrementy based on total buyables bought.",
    cost(){return new Decimal(5e147)},
    eff(){return player.buyables[1].add(player.buyables[2]).add(player.buyables[3]).add(player.buyables[4])},
    effectDisplay(){return format(UPGRADE[2].eff()) + 'x production'}
  },
  3:{
    title:"Incrementy Congregation",
    desc:"Gain more incrementy based on your current incrementy amount.",
    cost(){return new Decimal(2e173)},
    eff(){return player.incrementy.pow(0.025).add(1)},
    effectDisplay(){return format(UPGRADE[3].eff()) + 'x production'}
  },
  4:{
    title:"Booster Recursion",
    desc:"Incrementy Boosters add to their own base at a reduced rate.",
    cost(){return new Decimal(1e290)},
    eff(){return player.buyables[2].add(player.buyables[4]).sqrt().add(1)},
    effectDisplay(){return '+' + format(UPGRADE[4].eff()) + ' Incrementy Booster base'}
  },
  5:{
    title:"Factory Upgrader",
    desc:"Buyable Factories now give 1.4 free levels.",
    cost(){return new Decimal("1e909")},
  },
}

function buyUpgrade(a){
  if(player.incrementy.gte(UPGRADE[a].cost()) && !hasUpgrade(a)){
    player.incrementy = player.incrementy.sub(UPGRADE[a].cost())
    player.upgradesincrementy.push(a)
  }
}

function hasUpgrade(x){
 return player.upgradesincrementy.includes(x)
}

