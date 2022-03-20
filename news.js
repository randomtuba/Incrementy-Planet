var newsArray;

function updateNewsArray() {
  newsArray = [
    // Update B1 news tickers (25 total)
    ["haha number go up", true, "a1"],
    [
      "'OMG this is literally just an Ordinal Markup clone' -Literally everyone",
      true,
      "a2",
    ],
    [
      "How to make manifolds: 1) buy paper 2) fold the paper 3) mani",
      player.manifoldAmt.gte(1),
      "a3",
    ],
    ["99% can't reach 4th buyable!", true, "a4"],
    [
      "top 10 reasons incrementy is better than replicanti. 1) i forgor 💀",
      true,
      "a5",
    ],
    [
      "I wonder how many people have figured out that Buyable Factories don't actually produce buyables...",
      true,
      "a6",
    ],
    ["Kowalski, Overflow.", player.overflows.gte(1), "a7"],
    ["sus! sus! sus! sus!", true, "a8"],
    [
      "I used to be a manifold like you, but then I took a galaxy to the knee",
      player.galaxyAmt.gte(1),
      "a9",
    ],
    ["AD clone go brr", true, "a10"],
    ["Buyable 5 is a lie.", true, "a11"],
    ["Weeee, look at me go!", true, "a12"],
    ["@Pinglol", true, "a13"],
    [
      "It's important that the news ticker can't be disabled. The news ticker will never disappear and you will get tired of it faster.",
      true,
      "a14",
    ],
    [
      "The action of adding news tickers is like drugs. It's pleasure, but you can't do too much of it.",
      true,
      "a15",
    ],
    ["'shit game remove timewalls' -reda", true, "a16"],
    [
      "BREAKING NEWS: Tuba has decided to remove Buy Max, saying that it 'causes inflation'! Public in fury as riots break out in the CST timezone!",
      true,
      "a17",
    ],
    [
      "If 1.797e308 replicanti fills the universe, and 1e1000 incrementy fills the universe, then that must mean that replicanti is far more powerful than incrementy.",
      true,
      "a18",
    ],
    [
      "What's up LitFam, today we're gonna be eating bad news ticker ideas to see what they taste like!",
      true,
      "a19",
    ],
    ["Replicanti: Coming Soon", true, "a20"],
    [
      "Farming singularities is a fun and essential part of the game. Grinding dozens of singularities by spamming Buy Max and the Manifolds button builds pride and accomplishment when an autobuyer is upgrades. We are never nerfing this feature and you will never get tired of it. [overflow upgrade 5] Hey, wait a minute...",
      player.overflows.gte(1),
      "a21",
    ],
    ["Press Alt+F4 to die simultaneously", true, "a22"],
    [
      "uhhhh what am I supposed to put here? some kind of meta-joke or something?",
      true,
      "a23",
    ],
    ["The 100th news ticker does not exist.", true, "a24"],
    [
      "Everyone thinks the developers are randomtuba and FactorXXX, but the real developers were the friends we made along the way.",
      true,
      "a25",
    ],
    // Update B2 news tickers (15 total)
    ["how do you get news ticker messages? answer for 0 incrementy!!  1) quote people || 2) quote memes || 3) actually think of original news tickers || 4) copy existing news tickers, but to avoid plagiarism you change 4% of the words ||| if you answered 3) you are completely wrong, that was the only wrong answer",true,"a26"],
    ["The J is our lord and savior", true, "a27"],
    ["Don't be scared to close the game! You can still generate resources when you are gone, thanks to offline progress.",true,"a28"],
    ["You can't kill News Ticker Man, look at me go!", true, "a29"],
    ["Part 2: Tuba screws up", true, "a30"],
    ["Incrementy Planet? More like Console ERROR incremental", true, "a31"],
    ["Hey all, Scott here! My thoughts are being broadcasted on a news ticker now! No reason, just felt like it.", true, "a32"],
    ["Everyone's talking about Incrementy VS Replicanti, but what about Replicants and Duplicators?", true, "a33"],
    ["AAREX ADD BATTLE REPLICANTS OR I WILL FLATTEN YOU'RE CAR TIRES", true, "a34"],
    ["this ticker is d", true, "a35"],
    ["never gonna give you up...", true, "a36"],
    ["...never gonna let you down", true, "a37"],
    ["Research is timewall gaming", hasOU(8), "a38"],
    ["where is the newsticker planet", true, "a39"],
    ["Hello everyone, this is YOUR daily dose of incrementy. Here we have a-oh wait, the universe collapsed, hold on", player.totalSing.gte(1), "a40"],
    // Update B3 news tickers (6 total)
    ["Why are you playing this game? It's just a meaningless number going up with no implications on reality.",true,"a41"],
    ["Please nerf Incrementy Generators, they produce ALL of the incrementy",true,"a42"],
    ["'why are you @unpogged 77 centimeters tal?? 1047 pixels ( add this to incement plant news )' -DEMEMZEA",true,"a43"],
    ["go solve today's wordle if you haven't already",true,"a44"],
    ["eee169? Those are rookie numbers. f_psi(W_2^2)(549)? That's what I'm talking about!",true,"a45"],
    ["In the land of incrementy, we are not judged. Here we are peaceful. Here we are free.",true,"a46"],
  ]
}
var s;
var scrollTimeouts = [];
var nextMsgIndex;
function doodooWater() {
  s = document.getElementById("news");
  scrollNextMessage();
}
function scrollNextMessage() {
  updateNewsArray();
  //select a message at random

  try {
    do {
      nextMsgIndex = Math.floor(Math.random() * newsArray.length);
    } while (!eval(newsArray[nextMsgIndex][1]));
  } catch (e) {
    console.error("Newsarray doesn't work at idx " + nextMsgIndex);
  }

  scrollTimeouts.forEach(function (v) {
    clearTimeout(v);
  });
  scrollTimeouts = [];

  //set the text
  s.textContent = newsArray[nextMsgIndex][0]; //im going to test this
  //get the parent width so we can start the message beyond it
  let parentWidth = s.parentElement.clientWidth;

  //set the transition to blank so the move happens immediately
  s.style.transition = "";
  //move div_text to the right, beyond the edge of the div_container
  s.style.transform = "translateX(" + parentWidth + "px)";
  //we need to use a setTimeout here to allow the browser time to move the div_text before we start the scrolling
  scrollTimeouts.push(
    setTimeout(function () {
      //distance to travel is s.parentElement.clientWidth + s.clientWidth + parent padding
      //we want to travel at rate pixels per second so we need to travel for (distance / rate) seconds
      let dist = s.parentElement.clientWidth + s.clientWidth + 20; //20 is div_container padding
      let rate = 140; //change this value to change the scroll speed
      let transformDuration = dist / rate;

      //set the transition duration
      s.style.transition = "transform " + transformDuration + "s linear";
      let textWidth = s.clientWidth;
      //we need to move it to -(width+parent padding) before it won't be visible
      s.style.transform = "translateX(-" + (textWidth + 5) + "px)";
      //automatically start the next message scrolling after this one finishes
      //you could add more time to this timeout if you wanted to have some time between messages
      scrollTimeouts.push(
        setTimeout(scrollNextMessage, Math.ceil(transformDuration * 1000))
      );
    }, 100)
  );
}
