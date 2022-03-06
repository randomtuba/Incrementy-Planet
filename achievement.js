const ACHIEVEMENT={
  1:{
    title:"The start of something special",
    desc:"Buy an Incrementy Generator.",
    req(){return player.buyables[1].gte(1)}
  },
  2:{
    title:"100 incrementy is a lot",
    desc:"Reach 100 Incrementy.",
    req(){return player.incrementy.gte(100)}
  },
  3:{
    title:"It's got electrolytes!",
    desc:"Buy an Incrementy Booster.",
    req(){return player.buyables[2].gte(1)}
  },
  4:{
    title:"Enchanted tools",
    desc:"Buy an Efficiency Augmentor.",
    req(){return player.buyables[3].gte(1)}
  },
  5:{
    title:"Inflation go brr",
    desc:"Buy a Buyable Factory.",
    req(){return player.buyables[4].gte(1)}
  },
  6:{
    title:"Ordinal Markup Reference",
    desc:" Buy a manifold.",
    req(){return player.manifoldAmt.gte(1)}
  },
  7:{
    title:"Ordinal Markup Reference",
    desc:" Buy an Incrementy Upgrade.",
    req(){return hasUpgrade(1)}
  },
  7:{
    title:"Ordinal Markup Reference",
    desc:" Buy an Incrementy Upgrade.",
    req(){return hasUpgrade(1)}
  },
  7:{
    title:"Yeah, science",
    desc:" Buy an Incrementy Upgrade.",
    req(){return hasUpgrade(1)}
  },
}