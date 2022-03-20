var tmp = {
  text: "",
};
function gain() {
  let ips = new Decimal(0);
  ips = ips.add(BUYABLE[1].eff());
  ips = ips.mul(manifoldeff());
  if (hasUpgrade(2)) ips = ips.mul(UPGRADE[2].eff());
  if (hasUpgrade(3)) ips = ips.mul(UPGRADE[3].eff());
  ips = ips.mul(galaxy.eff());
  ips = ips.mul(blackholeeff());
  if (hasOU(1)) ips = ips.mul(OVERFLOW_UPGRADE[1].eff());
  if (hasOU(4)) ips = ips.mul(OVERFLOW_UPGRADE[4].eff());
  if (hasOU(7)) ips = ips.mul(OVERFLOW_UPGRADE[7].eff());
  if (ips.gte("1e100")) ips = ips.pow(0.75).mul("1e25");
  return ips;
}

function tab(a) {
  player.currentTab = a
  
}

function mainLoop(){
  if(!window["player"]||!player.incrementy)return;
  
  let diff = (Date.now()-player.time)/1000
  player.time = Date.now()
  player.incrementy = player.incrementy.add(gain().times(diff));
  
  autoFunction()
  overflowFunction()
  checkForAchs()
  
  player.total = player.total.add(hasAch(18) ? gain().times(diff) : gain().times(diff).min("1e1000"));
  if(!hasAch(18)) player.incrementy = player.incrementy.min("1e1000");
  if(player.currentTab == 'overflow'){
    if(!document.getElementById("theInput").value==""){
    player.inputVal = document.getElementById("theInput").value
    }
    if(document.getElementById("theInput").value==""&&(player.inputVal==null)==false){
    document.getElementById("theInput").value = player.inputVal
  }
  }
  player.timePlayed = player.timePlayed += diff;
  player.overflowTimes[0] = player.overflowTimes[0] += diff;
  player.blackhole = player.blackhole.add(blackholegain().times(diff));
  if((player.researchnum==null)==false){
    player.knowledge=player.knowledge.add(knowledgegain().times(diff))
    if(RESEARCH[player.researchnum].req()){
      player.research.push(player.researchnum)
      player.researchnum=null   
       player.knowledge=new Decimal(0)
    }
  }
  
  if(hasResearch(12)) player.replicanti=player.replicanti.times(player.replicanti.gte("1.797e308") ? REPLICANTI_BUYABLE[1].eff().pow(new Decimal(1).div(REPLICANTI_BUYABLE[2].eff())).pow(new Decimal(1).sub(player.replicanti.add(1).log10().sub(308).div(500))).pow(diff) : REPLICANTI_BUYABLE[1].eff().pow(new Decimal(1).div(REPLICANTI_BUYABLE[2].eff())).pow(diff))
  player.replicanti = player.replicanti.min("1e1000");
}

setInterval(mainLoop, 40);

function buyMax() {
  if (player.incrementy.gte(BUYABLE[4].cost())) {
    player.buyables[4] = player.incrementy
      .div(2e6)
      .log(1e5)
      .root(2)
      .floor()
      .add(1);
    if (!hasOU(2))
      player.incrementy = player.incrementy.sub(
        new Decimal(1e5).pow(player.buyables[4].sub(1).pow(2)).mul(2e6)
      );
  }
  if (player.incrementy.gte(BUYABLE[3].cost())) {
    player.buyables[3] = player.incrementy
      .div(3e4)
      .log(5)
      .root(1.39)
      .floor()
      .add(1);
    if (!hasOU(2))
      player.incrementy = player.incrementy.sub(
        new Decimal(5).pow(player.buyables[3].sub(1).pow(1.39)).mul(3e4)
      );
  }
  if (player.incrementy.gte(BUYABLE[2].cost())) {
    player.buyables[2] = player.incrementy
      .div(200)
      .log(4)
      .root(1.26)
      .floor()
      .add(1);
    if (!hasOU(2))
      player.incrementy = player.incrementy.sub(
        new Decimal(4).pow(player.buyables[2].sub(1).pow(1.26)).mul(200)
      );
  }
  if (player.incrementy.gte(BUYABLE[1].cost())) {
    player.buyables[1] = player.incrementy.div(10).log(1.26).floor().add(1);
    if (!hasOU(2))
      player.incrementy = player.incrementy.sub(
        new Decimal(1.26).pow(player.buyables[1].sub(1)).mul(10)
      );
  }
}

document.addEventListener("keydown", function onEvent(event) {
  switch (event.key) {
    case "b":
      if(player.manifoldAmt.gte(1) || player.galaxyAmt.gte(1) || player.totalSing.gte(1)) buyMax()
      break;
    case "1":
      buybuyable(1)
      break;
    case "2":
      buybuyable(2)
      break;
    case "3":
      buybuyable(3)
      break;
    case "4":
      buybuyable(4)
      break;
    case "m":
      buyManifold();
      break;
    case "g":
      buyGalaxy();
      break;
    case "o":
      if(hasAch(18)) manualOverflow();
      break;
  }
});