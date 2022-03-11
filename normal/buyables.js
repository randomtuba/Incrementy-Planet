const BUYABLE = {
  1: {
    title: "Incrementy Generator",
    desc: "Produces incrementy automagically!",
    cost() {
      return new Decimal(10).mul(new Decimal(1.26).pow(player.buyables[1]));
    },
    eff() {
      return player.buyables[1]
        .add(BUYABLE[4].eff())
        .pow(hasUpgrade(1) ? 2 : 1)
        .mul(BUYABLE[2].eff());
    },
    effectDisplay() {
      return "+" + format(BUYABLE[1].eff()) + " incrementy/sec";
    },
    unl() {
      return true;
    },
  },
  2: {
    title: "Incrementy Booster",
    desc: "Boosts Incrementy Generators with special chemicals!",
    cost() {
      return new Decimal(200).mul(
        new Decimal(4).pow(player.buyables[2].pow(1.26))
      );
    },
    eff() {
      return new Decimal(3)
        .add(BUYABLE[3].eff())
        .add(hasUpgrade(4) ? UPGRADE[4].eff() : 0)
        .times(hasOU(3) ? 1.1 : 1)
        .pow(player.buyables[2].add(BUYABLE[4].eff()));
    },
    effectDisplay() {
      return format(BUYABLE[2].eff()) + "x Incrementy Generator effectiveness";
    },
    unl() {
      return player.buyables[1].gte(5);
    },
  },
  3: {
    title: "Efficiency Augmentor",
    desc: "Increases the Incrementy Booster base...WHAAAAT??",
    cost() {
      return new Decimal(3e4).mul(
        new Decimal(5).pow(player.buyables[3].pow(1.39))
      );
    },
    eff() {
      return new Decimal(0.8).add(hasResearch(6)?0.35:0).mul(player.buyables[3].add(BUYABLE[4].eff()));
    },
    effectDisplay() {
      return "+" + format(BUYABLE[3].eff()) + " Incrementy Booster base";
    },
    unl() {
      return player.buyables[2].gte(3);
    },
  },
  4: {
    title: "Buyable Factory",
    desc: "Adds free levels to the previous three buyables!",
    cost() {
      return new Decimal(2e6).mul(
        new Decimal(1e5).pow(player.buyables[4].pow(2))
      );
    },
    eff() {
      let base = new Decimal(1);
      if (hasUpgrade(5)) base = new Decimal(1.4)
if (hasResearch(2)) base = new Decimal(3.2)
      return base.times(player.buyables[4]);
    },
    effectDisplay() {
      return (
        "+" + format(BUYABLE[4].eff()) + " free levels to previous buyables"
      );
    },
    unl() {
      return player.buyables[3].gte(3);
    },
  },
};

function buybuyable(a) {
  if (player.incrementy.gte(BUYABLE[a].cost())) {
    if (!hasOU(2)) player.incrementy = player.incrementy.sub(BUYABLE[a].cost());
    player.buyables[a] = player.buyables[a].add(1);
  }
}