var autobuyertime = 0;

function autoFunction(){
  autobuyertime += 1;
  if (
    autobuyertime % AUTOBUYER[1].interval().times(25).round() == 0 &&
    player.autobuyeron[1]
  ) {
    if (player.incrementy.gte(BUYABLE[1].cost())) {
      player.buyables[1] = player.incrementy.div(10).log(1.26).floor().add(1);
      if (!hasOU(2))
        player.incrementy = player.incrementy.sub(
          new Decimal(1.26).pow(player.buyables[1].sub(1)).mul(10)
        );
    }
  }

  if (
    autobuyertime % AUTOBUYER[2].interval().times(25).round() == 0 &&
    player.autobuyeron[2]
  ) {
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
  }

  if (
    autobuyertime % AUTOBUYER[3].interval().times(25).round() == 0 &&
    player.autobuyeron[3]
  ) {
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
  }
  if (
    autobuyertime % AUTOBUYER[4].interval().times(25).round() == 0 &&
    player.autobuyeron[4]
  ) {
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
  }
  if (
    autobuyertime % AUTOBUYER[5].interval().times(25).round() == 0 &&
    player.autobuyeron[5]
  ) {
    buyManifold();
  }
  if (
    autobuyertime % AUTOBUYER[6].interval().times(25).round() == 0 &&
    player.autobuyeron[6]
  ) {
    buyGalaxy();
  }
 
  if(player.autobuyeron[7]&&!player.inputVal==""){
    if(singFormula().gte(player.inputVal)){
      manualOverflow()
    }
  }
  
 // if(document.getElementById("theInput").value=="") document.getElementById("theInput").value=tmp.resetnum
}
  


const AUTOBUYER = {
  1: {
    desc: "Incrementy Generator Autobuyer",
    interval() {
      return new Decimal(3)
        .div(new Decimal(3).pow(player.autobuyer[1]))
        .max(0.04);
    },
    cost() {
      return new Decimal(2).pow(player.autobuyer[1].pow(0.8)).ceil();
    },
  },
  2: {
    desc: "Incrementy Booster Autobuyer",
    interval() {
      return new Decimal(3)
        .div(new Decimal(3).pow(player.autobuyer[2]))
        .max(0.04);
    },
    cost() {
      return new Decimal(2).pow(player.autobuyer[2].pow(0.85)).ceil();
    },
  },
  3: {
    desc: "Efficiency Augmentor Autobuyer",
    interval() {
      return new Decimal(3)
        .div(new Decimal(3).pow(player.autobuyer[3]))
        .max(0.04);
    },
    cost() {
      return new Decimal(2).pow(player.autobuyer[3].pow(0.9)).ceil();
    },
  },
  4: {
    desc: "Buyable Factory Autobuyer",
    interval() {
      return new Decimal(3)
        .div(new Decimal(3).pow(player.autobuyer[4]))
        .max(0.04);
    },
    cost() {
      return new Decimal(2).pow(player.autobuyer[4].pow(0.93)).ceil();
    },
  },
  5: {
    desc: "Manifolds Autobuyer",
    interval() {
      return new Decimal(4)
        .div(new Decimal(3).pow(player.autobuyer[5]))
        .max(0.04);
    },
    cost() {
      return new Decimal(2).pow(player.autobuyer[5].pow(0.96)).ceil();
    },
  },
  6: {
    desc: "Incrementy Galaxy Autobuyer",
    interval() {
      return new Decimal(6)
        .div(new Decimal(3).pow(player.autobuyer[6]))
        .max(0.04);
    },
    cost() {
      return new Decimal(2).pow(player.autobuyer[6].pow(1.01)).ceil();
    },
  },
}

function buyautobuyer(a) {
  if (
    player.singularities.gte(AUTOBUYER[a].cost()) &&
    !AUTOBUYER[a].interval().lte(0.04)
  ) {
    player.singularities = player.singularities.sub(AUTOBUYER[a].cost());
    player.autobuyer[a] = player.autobuyer[a].add(1);
  }
}
function turnautobuyer(a) {
  if(!a==7){
    if (player.autobuyer[a].gte(1)||a==7)
    player.autobuyeron[a] = !player.autobuyeron[a]
  }
 else player.autobuyeron[a] = !player.autobuyeron[a]
}