const ACHIEVEMENT = {
  1: {
    title: "The start of something special",
    desc: "Buy an Incrementy Generator.",
    req() {
      return player.buyables[1].gte(1);
    },
  },
  2: {
    title: "100 incrementy is a lot",
    desc: "Reach 100 Incrementy.",
    req() {
      return player.incrementy.gte(100);
    },
  },
  3: {
    title: "It's got electrolytes!",
    desc: "Buy an Incrementy Booster.",
    req() {
      return player.buyables[2].gte(1);
    },
  },
  4: {
    title: "Enchanted tools",
    desc: "Buy an Efficiency Augmentor.",
    req() {
      return player.buyables[3].gte(1);
    },
  },
  5: {
    title: "Inflation go brr",
    desc: "Buy a Buyable Factory.",
    req() {
      return player.buyables[4].gte(1);
    },
  },
  6: {
    title: "Ordinal Markup Reference",
    desc: " Buy a manifold.",
    req() {
      return player.manifoldAmt.gte(1);
    },
  },
  7: {
    title: "Yeah, science!",
    desc: " Buy an Incrementy Upgrade.",
    req() {
      return hasUpgrade(1);
    },
  },
  8: {
    title: "Manifolds are like onions",
    desc: " Have 4 manifolds at once.",
    req() {
      return player.manifoldAmt.gte(1);
    },
  },
  9: {
    title: "Bob the builder",
    desc: " Have at least 1,000 buyables bought.",
    req() {
      return player.buyables[1]
        .add(player.buyables[2])
        .add(player.buyables[3])
        .add(player.buyables[4])
        .gte(1000);
    },
  },
  10: {
    title: "Incrementy Apocalypse",
    desc: " Reach 1e280 incrementy",
    req() {
      return player.incrementy.gte(1e280);
    },
  },
  11: {
    title: "You got past the Big Wall",
    desc: " Buy an Incrementy Galaxy.",
    req() {
      return player.galaxyAmt.gte(1);
    },
  },
  12: {
    title: "Do I really need the other buyables?",
    desc: " Reach 1e150 points with only Incrementy Generators.",
    req() {
      return (
        player.incrementy.gte(1e150) &&
        player.buyables[2]
          .add(player.buyables[3])
          .add(player.buyables[4])
          .lte(0)
      );
    },
  },
  13: {
    title: "NUM_MAX",
    desc: " Overflow the Universe with incrementy.",
    req() {
      return player.incrementy.gte("1e1000");
    },
  },
  14: {
    title: "Upgradeless",
    desc: "Buy an incrementy galaxy with only 2 incrementy upgrades bought. (Reward: Keep incrementy upgrades on Overflow.)",
    req() {
      return player.galaxyAmt.gte(1) && player.upgradesincrementy.length <= 2;
    },
  },
  15: {
    title: "Less clicking required",
    desc: "Unlock any autobuyer.",
    req() {
      return (
        player.autobuyer[1].gte(1) ||
        player.autobuyer[2].gte(1) ||
        player.autobuyer[3].gte(1) ||
        player.autobuyer[4].gte(1) ||
        player.autobuyer[5].gte(1) ||
        player.autobuyer[6].gte(1)
      );
    },
  },
  16: {
    title: "That's fast!",
    desc: "Overflow in under 3 minutes. (Reward: Start with 2,000,000 incrementy.)",
    req() {
      return player.overflowTimes[1] <= 180;
    },
  },
  17: {
    title: "Not enough space",
    desc: "Reach 1e900 incrementy with 1 Incrementy Galaxy. (Reward: Incrementy Galaxies are 1.5x as effective.)",
    req() {
      return player.incrementy.gte("1e900") && player.galaxyAmt.eq(1);
    },
  },
  18: {
    title: "Sweaty Speedrunner",
    desc: "Overflow in under 10 seconds. (Reward: You can go past 1e1000 incrementy, for more singularity gain.)",
    req() {
      return player.overflowTimes[1] <= 10;
    },
  },
  19: {
    title: "Why buy when you can produce?",
    desc: "Reach 1e200 incrementy with only Buyable Factories. (Reward: Pride in Expense is more effective.)",
    req() {
      return player.incrementy.gte(1e200)&&(buyableAmt=player.buyables[1]
        .add(player.buyables[2])
        .add(player.buyables[3])).eq(0);
    },
  },
  20: {
    title: "Bulked up",
    desc: "Max out all of your autobuyers.",
    req() {
      return (
        AUTOBUYER[1].interval().times(25).round().eq(1) &&
        AUTOBUYER[2].interval().times(25).round().eq(1) &&
        AUTOBUYER[3].interval().times(25).round().eq(1) &&
        AUTOBUYER[4].interval().times(25).round().eq(1) &&
        AUTOBUYER[5].interval().times(25).round().eq(1) &&
        AUTOBUYER[6].interval().times(25).round().eq(1)
      );
    },
  },
  21: {
    title: "Overflowing Overflows",
    desc: "Overflow 500 times. (Reward: Gain 1.2x more knowledge capsules for every research upgrade bought.)",
    req() {
      return player.overflows.gte(500);
    },
  },
  22: {
    title: "Studying Time",
    desc: "Unlock Research.",
    req() {
      return hasOU(8);
    },
  },
  23: {
    title: "World Record",
    desc: "Overflow in under 0.3 seconds.",
    req() {
      return player.overflowTimes[1] <= 0.3;
    },
  },
  24: {
    title: "Yeah, this is big brain time",
    desc: "Reach 10,000,000 knowledge capsules.",
    req() {
      return player.knowledge.gte(1e7);
    },
  },
};

function checkForAchs(){
  for (let a = 1; a <= 24; a++) {
    if (ACHIEVEMENT[a].req() && !hasAch(a)) player.ach.push(a);
  }
}

function hasAch(a) {
  return player.ach.includes(a);
}

function achtext(a) {
  let text = ACHIEVEMENT[a].title;
  text += ": ";
  text += ACHIEVEMENT[a].desc;
  tmp.achtext = text;
}
