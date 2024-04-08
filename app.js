import van from "https://cdn.jsdelivr.net/gh/vanjs-org/mini-van/public/mini-van-0.5.6.min.js";
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

  const answers = [];
  for (let c = "A"; c <= "Z"; c = String.fromCharCode(c.charCodeAt(0) + 1)) {
    answers.push(c);
  }
  for (let i = 0; i <= 9; i++) {
    answers.push(i);
  }

  // TODO add onclick right right/wrong feedback

  return div([
    h2("capital " + lower + " ?"),
    div(
      {style: "display: grid; grid-template-columns: repeat(6, 1fr); grid-gap: 2em;"},
      answers.map(answer => button(answer))
    ),
  ]);
};

const App = () => {
  return [
    h1("QuizQuail"),
    Quiz(),
    footer(a({href: "https://github.com/darthwalsh/QuizQuail"}, "Contact on Github")),
  ];
};

van.add(document.body, App());
