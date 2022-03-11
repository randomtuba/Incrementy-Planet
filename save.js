var player = {};

function start() {
  let a = {
    incrementy: new Decimal(10),
    total: new Decimal(10),
    buyables: [
      null,
      new Decimal(0),
      new Decimal(0),
      new Decimal(0),
      new Decimal(0),
    ],
    currentTab: "main",
    manifoldAmt: new Decimal(0),
    galaxyAmt: new Decimal(0),
    upgradesincrementy: [],
    upgradesoverflow: [],
    ach: [],
    timePlayed: 0,
    singularities: new Decimal(0),
    totalSing: new Decimal(0),
    blackhole: new Decimal(0),
    autobuyer: [
      null,
      new Decimal(0),
      new Decimal(0),
      new Decimal(0),
      new Decimal(0),
      new Decimal(0),
      new Decimal(0),
    ],
    overflowTimes: [0, 10000000], // 1st is for time in this overflow, 2nd is for fastest overflow time
    overflows: new Decimal(0),
    autobuyeron: [null, false, false, false, false, false, false, false],
    research:[],
    researchnum: null,
    knowledge: new Decimal(0),
    time: Date.now(),
    inputVal: 100000000,
  };
  return a;
}
function save() {
  localStorage.setItem("idk", btoa(JSON.stringify(player)));
}
function fixSave() {
  let defaultData = start();

  fixData(defaultData, player);
}

function fixData(defaultData, newData) {
  for (item in defaultData) {
    if (defaultData[item] == null) {
      if (newData[item] === undefined) newData[item] = null;
    } else if (Array.isArray(defaultData[item])) {
      if (newData[item] === undefined) newData[item] = defaultData[item];
      else fixData(defaultData[item], newData[item]);
    } else if (defaultData[item] instanceof Decimal) {
      // Convert to Decimal

      if (newData[item] === undefined) newData[item] = defaultData[item];
      else newData[item] = new Decimal(newData[item]);
    } else if (!!defaultData[item] && typeof defaultData[item] === "object") {
      if (newData[item] === undefined || typeof defaultData[item] !== "object")
        newData[item] = defaultData[item];
      else fixData(defaultData[item], newData[item]);
    } else {
      if (newData[item] === undefined) newData[item] = defaultData[item];
    }
  }
}
function load() {
  let get = localStorage.getItem("idk");

  if (get === null || get === undefined) {
    player = start();
  } else {
    player = Object.assign(
      start(),
      JSON.parse(decodeURIComponent(escape(atob(get))))
    );
    fixSave();
  }
  app = new Vue({
    el: "#app",
    data: {
      player,
      Decimal,
      format,
      tmp,
      hasResearch,
    },
  });
s = document.getElementById("news");
  scrollNextMessage();
}
setInterval(function () {
  save();
}, 5000);
window.onload = function () {
  load();
};

function exportSave() {
  let str = btoa(JSON.stringify(player));
  const el = document.createElement("textarea");
  el.value = str;
  document.body.appendChild(el);
  el.select();
  el.setSelectionRange(0, 99999);
  document.execCommand("copy");
  document.body.removeChild(el);
}

function importSave(imported = undefined) {
  if (imported === undefined) imported = prompt("paste your save here");
  player = JSON.parse(atob(imported));
  save();
  window.location.reload();
}
function hardReset() {
  if (
    confirm(
      "Are you sure??? It will reset EVERYTHING and you will not get any reward!!!"
    )
  ) {
    player = start();
    window.location.reload();
    save();
  }
}
