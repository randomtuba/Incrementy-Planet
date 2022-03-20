function replicantiEff(){
  return hasOU(11) ? player.replicanti.add(1).pow(0.015) : player.replicanti.add(1).log2()
}

const REPLICANTI_BUYABLE = {
  1: {
    title: "Replication Augmentor",
    desc: "Increase the replicanti multiplier per replicanti tick.",
    cost() {
      return new Decimal(10000).mul(new Decimal(3).pow(player.repliBuyables[1]));
    },
    eff() {
      return new Decimal(hasOU(11)?2:1.1).pow(player.repliBuyables[1].add(1))
    },
    effectDisplay() {
      return format(REPLICANTI_BUYABLE[1].eff()) + "x replicanti multiplier";
    },
  },
  2: {
    title: "Temporal Shrinker",
    desc: "Decrease the replicanti tick interval.",
    cost() {
      return new Decimal(10000).mul(new Decimal(6).pow(player.repliBuyables[2]));
    },
    eff() {
      return new Decimal(1).div(new Decimal(1).add(player.repliBuyables[2].div(2)))
    },
    effectDisplay() {
      return format(REPLICANTI_BUYABLE[2].eff().mul(1000)) + "ms replicanti interval";
    },
  },
  3: {
    title: "Pocket Galaxy Container",
    desc: "Increase the maximum amount of replicanti galaxies you can have.",
    cost() {
      return player.repliBuyables[3].gte(4) ? new Decimal(500000).mul(new Decimal(9).pow(player.repliBuyables[3]).pow(1.26)) : new Decimal(500000).mul(new Decimal(9).pow(player.repliBuyables[3]).pow(1.1));
    },
    eff() {
      return player.repliBuyables[3].add(1)
    },
    effectDisplay() {
      return format(REPLICANTI_BUYABLE[3].eff()) + " max replicanti galaxies";
    },
  },
};

function buyRepliBuyable(a) {
  if (player.singularities.gte(REPLICANTI_BUYABLE[a].cost())) {
    player.singularities = player.singularities.sub(REPLICANTI_BUYABLE[a].cost());
    player.repliBuyables[a] = player.repliBuyables[a].add(1);
  }
}

const replicanti_galaxy = {
  title: "Replicanti Galaxies",
  desc: "Reset replicanti, but gain a Replicated Galaxy, which is a slightly weaker Incrementy Galaxy.",
  eff() {
    return player.repliGalaxies.div(50)
  },
  effectDisplay() {
    return (
      "+" + format(replicanti_galaxy.eff()) + " manifold exponent"
    );
  },
};

function buyRepliGalaxy() {
  if (player.replicanti.gte("1.797e308") && player.repliGalaxies.lt(REPLICANTI_BUYABLE[3].eff())) {
    player.replicanti = new Decimal(1);
    player.repliGalaxies = player.repliGalaxies.add(1);
  }
}