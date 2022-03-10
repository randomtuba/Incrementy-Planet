function overflowFunction(){
  if (player.incrementy.gte("1e1000") && !hasAch(18)) {
    setTimeout(function () {
      player.incrementy = hasAch(16) ? new Decimal(1e6) : new Decimal(10);
      player.buyables = [
        null,
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
      ];
      if (!hasAch(14)) player.upgradesincrementy = [];
      player.manifoldAmt = new Decimal(0);
      player.galaxyAmt = new Decimal(0);
      player.singularities = player.singularities.add(1);
      player.totalSing = player.totalSing.add(1);
      player.overflows = player.overflows.add(1);
      if (player.overflowTimes[0] < player.overflowTimes[1])
        player.overflowTimes[1] = player.overflowTimes[0];
      player.overflowTimes[0] = 0;
      alert("The universe has filled to the brim with incrementy!");
    }, 20);
  }
}

function singFormula(){
  let gain=player.incrementy.log("1e1000").pow(2)
  if(hasResearch(11)) gain = player.incrementy.div("1e1000").pow(0.0005)
  if(hasUpgrade(7)) gain=gain.times(3)
  return gain.floor()
}
function manualOverflow() {
  if (player.incrementy.gte("1e1000")) {
          player.overflows = player.overflows.add(hasUpgrade(10)?UPGRADE[10].eff1():1);
      player.singularities = player.singularities.add(singFormula());
      player.totalSing = player.totalSing.add(singFormula());
      player.incrementy = hasAch(16) ? new Decimal(2e6) : new Decimal(10);
      player.buyables = [
        null,
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
        new Decimal(0),
      ];
      if (!hasAch(14)) player.upgradesincrementy = [];
      player.manifoldAmt = new Decimal(0);
      player.galaxyAmt = new Decimal(0);
      if (player.overflowTimes[0] < player.overflowTimes[1])
        player.overflowTimes[1] = player.overflowTimes[0];
      player.overflowTimes[0] = 0;
}
}
function blackholegain() {
  let gain = player.totalSing.pow(2);
  if(hasUpgrade(8)) gain = gain.mul(UPGRADE[8].eff())
  return gain
}
function blackholeeff() {
  let eff=player.blackhole.add(1).pow(0.4);
  if (hasResearch(2)) eff = eff.pow(18)
  return eff
}

const OVERFLOW_UPGRADE = {
  1: {
    title: "Temporal Multiplier",
    desc: "Gain more incrementy based on time played.",
    cost() {
      return new Decimal(2);
    },
    eff() {
      return new Decimal(player.timePlayed).add(1).log(2).add(1);
    },
    effectDisplay() {
      return format(OVERFLOW_UPGRADE[1].eff()) + "x production";
    },
  },
  2: {
    title: "Currency Sustainability",
    desc: "Buyables do not subtract from your incrementy amount.",
    cost() {
      return new Decimal("3");
    },
  },
  3: {
    title: "Booster Enhancement",
    desc: "Multiply the incrementy booster base by 1.1.",
    cost() {
      return new Decimal("3");
    },
  },
  4: {
    title: "Speedrun Bonus",
    desc: "Gain more incrementy based on your fastest overflow.",
    cost() {
      return new Decimal("4");
    },
    eff() {
      return new Decimal(1).div(new Decimal(player.overflowTimes[1]).div(100).pow(5));
    },
    effectDisplay() {
      return format(OVERFLOW_UPGRADE[4].eff()) + "x production";
    },
  },
  5: {
    title: "Everlasting Manifolds",
    desc: "Incrementy Galaxies reset nothing.",
    cost() {
      return new Decimal("6");
    },
  },
  6: {
    title: "No More Resets",
    desc: "Manifolds reset nothing.",
    cost() {
      return new Decimal("50");
    },
  },
  7: {
    title: "Singularity Energizing",
    desc: "Gain more incrementy based on total singularities.",
    cost() {
      return new Decimal("100");
    },
    eff() {
      return player.totalSing.pow(50).add(1);
    },
    effectDisplay() {
      return format(OVERFLOW_UPGRADE[7].eff()) + "x production";
    },
  },
  8: {
    title: "Full Industrialization",
    desc: "Unlock Automatic Overflow and Research.",
    cost() {
      return new Decimal("200");
    },
  },
};

function buyOU(a) {
  if (player.singularities.gte(OVERFLOW_UPGRADE[a].cost()) && !hasOU(a)) {
    player.singularities = player.singularities.sub(OVERFLOW_UPGRADE[a].cost());
    player.upgradesoverflow.push(a);
  }
}
function hasOU(x) {
  return player.upgradesoverflow.includes(x);
}