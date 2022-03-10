const UPGRADE = {
  1: {
    title: "Generator Enhancer",
    desc: "Incrementy Generator effectiveness is squared (before the multiplier).",
    cost() {
      return new Decimal(1e140);
    },
  },
  2: {
    title: "Pride in Expense",
    desc: "Gain more incrementy based on total buyables bought.",
    cost() {
      return new Decimal(5e147);
    },
    eff() {
      let  buyableAmt=player.buyables[1]
        .add(player.buyables[2])
        .add(player.buyables[3])
        .add(player.buyables[4]);
      if(hasUpgrade(6)) buyableAmt=player.buyables[1]
        .mul(player.buyables[2])
        .mul(player.buyables[3])
        .mul(player.buyables[4]).max(1)
      if(hasAch(19)) buyableAmt=buyableAmt.pow(20)
      return buyableAmt
    },
    effectDisplay() {
      return format(UPGRADE[2].eff()) + "x production";
    },
  },
  3: {
    title: "Incrementy Congregation",
    desc: "Gain more incrementy based on your current incrementy amount.",
    cost() {
      return new Decimal(2e173);
    },
    eff() {
  let eff=player.incrementy.pow(0.025).add(1);
       if(hasResearch(9)) eff=eff.pow(2)
      return eff
    },
    effectDisplay() {
      return format(UPGRADE[3].eff()) + "x production";
    },
  },
  4: {
    title: "Booster Recursion",
    desc: "Incrementy Boosters add to their own base at a reduced rate.",
    cost() {
      return new Decimal(1e290);
    },
    eff() {
      return player.buyables[2].add(player.buyables[4]).sqrt().add(1);
    },
    effectDisplay() {
      return "+" + format(UPGRADE[4].eff()) + " Incrementy Booster base";
    },
  },
  5: {
    title: "Factory Upgrader",
    desc: "Buyable Factories now give 1.4 free levels.",
    cost() {
      return new Decimal("1e909");
    },
  },
  6: {
    title: "Pride in Expense (tier II)",
    desc: "Improve the formula for Pride in Expense.",
    cost() {
      return new Decimal("1e5250");
    }, 
  },
  7: {
    title: "Singularity Tripler",
    desc: "Triple singularity gain.",
    cost() {
      return new Decimal("1e5825");
    },
  },
  8: {
    title: "Feed the Black Hole",
    desc: "Gain more black hole mass based on overflowed stat.",
    cost() {
      return new Decimal("1e5870");
    },
    eff() {
      return player.overflows.pow(1.5)
    },
    effectDisplay() {
      return format(UPGRADE[8].eff()) + "x black hole mass gain";
    },
  },
   9: {
    title: "Sentient Incrementy",
    desc: "Gain more knowledge capsules based on your incrementy.",
    cost() {
      return new Decimal("e5940");
    },
     eff() {
      return player.incrementy.add(1e10).log(10).log(10).pow(1.75)
    },
    effectDisplay() {
      return format(UPGRADE[9].eff()) + "x knowledge capsules gain";
    },
  },
  10: {
    title: "Manifold Power",
    desc: "Gain more overflowed stat and knowledge capsules based on your manifolds.",
    cost() {
      return new Decimal("1e6000");
    },
    eff1() {
      return player.manifoldAmt.add(2).pow(0.5).floor()
    },
    eff2() {
      return player.manifoldAmt.add(2).pow(0.5)
    },
    effectDisplay() {   
      return format(UPGRADE[10].eff1()) + "x overflowed stat and "+format(UPGRADE[10].eff2()) + "x knowledge capsules"
    },
  },
};


function buyUpgrade(a) {
  if (player.incrementy.gte(UPGRADE[a].cost()) && !hasUpgrade(a)) {
    if (!hasOU(2)) player.incrementy = player.incrementy.sub(UPGRADE[a].cost());
    player.upgradesincrementy.push(a);
  }
}

function hasUpgrade(x) {
  return player.upgradesincrementy.includes(x);
}

function rowAmt(){
  let row=1
  if(hasResearch(10))row++
  return row
}