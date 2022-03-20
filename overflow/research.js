const RESEARCH={
  1:{
    title:"Knowledge Generator",
    desc:"Generate knowledge capsules when you are researching an upgrade. (based on singularities)",
    req(){return true},
    reqdesc:"Free",
    effect(){return player.singularities.log(10).pow(4)},
    effectDisplay(){return format(this.effect())+"/sec"},
  },
  2:{
    title:"Factory Upgrader (tier II)",
    desc:"Buyable Factories now give 3.2 free levels.",
    req(){return player.knowledge.gte(2500)},
    reqdesc:"2.5e3 knowledge capsules",
  },
  3:{
    title:"Stronger Black Hole",
    desc:"Strengthen the black hole mass effect.",
    req(){return player.knowledge.gte(5000)},
    reqdesc:"5e3 knowledge capsules",
  },
  4:{
    title:"Cerebral Expansion",
    desc:"Gain more knowledge capsules, but you can't finish researching Cosmic Wisdom.",
    req(){return player.knowledge.gte(30000) && (!hasResearch(5)||hasResearch(8))},
    reqdesc:"3e4 knowledge capsules",
    effect(){return new Decimal(5)},
    effectDisplay(){return format(this.effect())+"x"},
  },
  5:{
    title:"Cosmic Wisdom",
    desc:"Gain more knowledge capsules, but you can't finish researching Cerebral Expansion.",
    reqdesc:"3e4 knowledge capsules",
     req(){return player.knowledge.gte(30000) && (!hasResearch(4)||hasResearch(8))},
    effect(){return new Decimal(player.overflows).add(1).log(10).pow(1.6)},
    effectDisplay(){return format(this.effect())+"x"},
  },
   6:{
    title:"Augmentor Upgrader",
    desc:"Increase the Efficiency Augmentor base by 0.35.",
    req(){return player.knowledge.gte(1.5e5)},
    reqdesc:"1.5e5 knowledge capsules",
  },
  7:{
    title:"Thinning Layers",
    desc:"Manifolds are 10% cheaper.",
    req(){return player.knowledge.gte(2.5e5)},
    reqdesc:"2.5e5 knowledge capsules",
  },
  8:{
    title:"Unanimous Opinion",
    desc:"You can buy both Cerebral Expansion and Cosmic Wisdom.",
    req(){return player.knowledge.gte(3.25e5)},
    reqdesc:"3.25e5 knowledge capsules",
  },
  9:{
    title:"Incrementy Congregation (tier II)",
    desc:"Change the exponent in Incrementy Congregation from 0.025 to 0.05.",
    req(){return player.knowledge.gte(1.5e6)},
    reqdesc:"1.5e6 knowledge capsules",
  },
  10:{
    title:"Missed Opportunities",
    desc:" Unlock 5 new Incrementy Upgrades.",
    req(){return player.knowledge.gte(3e6)},
    reqdesc:"3e6 knowledge capsules",
  },
  11:{
    title:"Overflow Potency",
    desc:"Change the singularities formula.",
    req(){return player.knowledge.gte(5e7)},
    reqdesc:"5e7 knowledge capsules",
  },
  12:{
    title:"New Mechanic???",
    desc:"Unlock Replicanti and 4 new singularity upgrades.",
    req(){return player.knowledge.gte(2e8)},
    reqdesc:"2e8 knowledge capsules",
  },
}

function knowledgegain(){
  let gain =new Decimal(0)
  if(player.researchnum==null)return 0
  if(hasResearch(1)) gain=RESEARCH[1].effect()
  if(hasResearch(4)) gain=gain.mul(RESEARCH[4].effect())
  if(hasResearch(5)) gain=gain.mul(RESEARCH[5].effect())
  if(hasAch(21)) gain=gain.mul(new Decimal(1.2).pow(player.research.length))
  if(hasUpgrade(9)) gain=gain.mul(UPGRADE[9].eff())
  if(hasUpgrade(10)) gain=gain.mul(UPGRADE[10].eff2())
  return gain
}
function research(a){
  if(hasResearch(a)) return
  if(player.researchnum==null){
  player.researchnum=a
  }
  else if(player.researchnum==a){
    player.researchnum=null
    player.knowledge=new Decimal(0)
  }
}
function hasResearch(x) {
  return player.research.includes(x)
}