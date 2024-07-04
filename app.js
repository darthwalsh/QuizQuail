import van from "https://cdn.jsdelivr.net/gh/vanjs-org/van/public/van-1.5.0.min.js";
const {a, button, div, footer, h1, h2} = van.tags;

const state = {
  past: [],
};

function next() {
  while (1) {
    const offset = Math.floor(Math.random() * 26);
    const lower = String.fromCharCode("a".charCodeAt(0) + offset);
    if (state.past.includes(lower)) continue;

    if (state.past.length > 5) state.past.shift(); // TODO test this
    state.past.push(lower);

    return lower;
  }
}

const Quiz = () => {
  const lower = next();
  // MAYBE have different question domains, with {question, answer, options}

  const options = [];
  for (let c = "A"; c <= "Z"; c = String.fromCharCode(c.charCodeAt(0) + 1)) {
    options.push(c);
  }
  for (let i = 0; i <= 9; i++) {
    options.push(i);
  }

  // TODO add onclick right right/wrong feedback

  const answer = lower.toUpperCase();
  function onclick(e) {
    const closest = e.target.closest("button");
    if (!closest) {
      console.log("no button clicked");
      return
    }
    const choice = closest.innerText;
    if (choice !== answer) {
      console.log(`Wrong expected ${answer} got ${choice}`);
      return;
    }
    console.log("Correct!");
  }

  return div(
    h2("capital " + lower + " ?"),
    div(
      {
        onclick,
        style: "display: grid; grid-template-columns: repeat(6, 1fr); grid-gap: 2em;",
      },
      options.map(answer => button(answer))
    ));
};

const App = () => {
  return div(
    h1("QuizQuail"),
    Quiz(),
    footer(a({href: "https://github.com/darthwalsh/QuizQuail"}, "Contact on Github")),
  );
};

van.add(document.body, App());
