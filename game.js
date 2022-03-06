function gain(){
  let ips = new Decimal(0)
  ips = ips.add(BUYABLE[1].eff())
  ips = ips.mul(manifoldeff())
  if(hasUpgrade(2)) ips = ips.mul(UPGRADE[2].eff())
  if(hasUpgrade(3)) ips = ips.mul(UPGRADE[3].eff())
  ips = ips.mul(galaxy.eff())
  if(ips.gte("1e100")) ips = ips.pow(0.75).mul("1e25")
  return ips
}

function tab(a){
  player.currentTab = a
}

setInterval(function () {
  player.incrementy=player.incrementy.add(gain().div(25))
  player.total=player.total.add(gain().div(25).min("1e1000"))
  player.incrementy = player.incrementy.min("1e1000")
  player.timePlayed = player.timePlayed += 0.04
}, 40);

function buyMax(){
  if(player.incrementy.gte(BUYABLE[4].cost())){
     player.buyables[4] = player.incrementy.div(2e6).log(1e5).root(2).floor().add(1)
     player.incrementy = player.incrementy.sub(new Decimal(1e5).pow(player.buyables[4].sub(1).pow(2)).mul(2e6))
   }
  if(player.incrementy.gte(BUYABLE[3].cost())){
     player.buyables[3] = player.incrementy.div(3e4).log(5).root(1.39).floor().add(1)
     player.incrementy = player.incrementy.sub(new Decimal(5).pow(player.buyables[3].sub(1).pow(1.39)).mul(3e4))
   }
   if(player.incrementy.gte(BUYABLE[2].cost())){
     player.buyables[2] = player.incrementy.div(200).log(4).root(1.26).floor().add(1)
     player.incrementy = player.incrementy.sub(new Decimal(4).pow(player.buyables[2].sub(1).pow(1.26)).mul(200))
   }
  if(player.incrementy.gte(BUYABLE[1].cost())){
    player.buyables[1] = player.incrementy.div(10).log(1.26).floor().add(1)
    player.incrementy = player.incrementy.sub(new Decimal(1.26).pow(player.buyables[1].sub(1)).mul(10))
  }
}

