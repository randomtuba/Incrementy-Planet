function manifoldcost() {
  let exp = new Decimal(1.5);
  if (player.manifoldAmt.gte(15))
    exp = exp.add(new Decimal(0.025).times(player.manifoldAmt.sub(14)));
  return new Decimal(1e70).mul(
    new Decimal(1e10).pow(player.manifoldAmt.pow(exp))
  );
}
function manifoldeff() {
  return new Decimal(10).pow(
    player.manifoldAmt.pow(new Decimal(2).add(galaxy.eff2()))
  );
}
function buyManifold() {
  if (player.incrementy.gte(manifoldcost())) {
    if(!hasOU(6)){
    player.incrementy = new Decimal(10);
    player.buyables = [
      null,
      new Decimal(0),
      new Decimal(0),
      new Decimal(0),
      new Decimal(0),
    ];
    }
    player.manifoldAmt = player.manifoldAmt.add(1);
  }
}

const galaxy = {
  title: "Incrementy Galaxies",
  desc: "Reset everything that manifolds reset, but also reset manifolds for an Incrementy Galaxy. (your incrementy upgrades are kept)",
  cost() {
    return new Decimal(6)
      .add(new Decimal(6).mul(new Decimal(player.galaxyAmt)))
      .add(player.galaxyAmt.max(1).sub(1).pow(1.5))
      .ceil();
  },
  eff() {
    return new Decimal(50).pow(player.galaxyAmt);
  },
  eff2() {
    return player.galaxyAmt.div(25).mul(hasAch(17)?1.5:1);
  },
  effectDisplay() {
    return (
      format(galaxy.eff()) +
      "x production and +" +
      format(galaxy.eff2()) +
      " manifold exponent"
    );
  },
  unl() {
    return player.manifoldAmt.gte(6) || player.galaxyAmt.gte(1);
  },
};

function buyGalaxy() {
  if (player.manifoldAmt.gte(galaxy.cost())) {
    if(!hasOU(5)){
    player.incrementy = new Decimal(10);
    player.buyables = [
      null,
      new Decimal(0),
      new Decimal(0),
      new Decimal(0),
      new Decimal(0),
    ];
    player.manifoldAmt = new Decimal(0);
    }
    player.galaxyAmt = player.galaxyAmt.add(1);
  }
}
