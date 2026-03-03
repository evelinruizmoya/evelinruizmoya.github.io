const API_BASE = "https://pokeapi.co/api/v2/pokemon/";
const CACHE_TTL_MS = 1000 * 60 * 60 * 24;
const TEAM_KEY = "team:v1";

const queryEl = document.getElementById("query");
const findBtn = document.getElementById("findBtn");
const addBtn = document.getElementById("addBtn");
const statusEl = document.getElementById("status");

const spriteEl = document.getElementById("sprite");
const cryEl = document.getElementById("cry");

const moveSelects = [
  document.getElementById("move1"),
  document.getElementById("move2"),
  document.getElementById("move3"),
  document.getElementById("move4"),
];

const teamListEl = document.getElementById("teamList");

let currentPokemon = null;

function setStatus(msg) 
{
  statusEl.textContent = msg || "";
}

function normalizeQuery(q) 
{
  return (q || "").trim().toLowerCase();
}


function cacheKey(q) 
{
  return `poke:${q}`;
}

function cacheGet(key) 
{
  const raw = localStorage.getItem(key);
  if (!raw) return null;
  try { return JSON.parse(raw); } catch { return null; }
}

function cacheSet(key, data) 
{
  localStorage.setItem(key, JSON.stringify({ savedAt: Date.now(), data }));
}

function cacheFresh(entry) 
{
  return entry && (Date.now() - entry.savedAt) < CACHE_TTL_MS;
}

async function fetchPokemon(q) 
{
  const key = cacheKey(q);
  const cached = cacheGet(key);

  if (cacheFresh(cached)) return cached.data;

  const res = await fetch(API_BASE + encodeURIComponent(q));
  if (!res.ok) throw new Error("Pokemon not found.");

  const data = await res.json();
  cacheSet(key, data);
  return data;
}

function resetMoves() 
{
  moveSelects.forEach(s => {
    s.innerHTML = `<option value=""></option>`;
  });
}

function fillMoves(p) 
{
  const moves = p.moves
    .map(m => m.move.name)
    .sort((a, b) => a.localeCompare(b));

  const html =
    `<option value=""></option>` +
    moves.map(m => `<option value="${m}">${m}</option>`).join("");

  moveSelects.forEach(s => (s.innerHTML = html));
}

function clearDisplay() 
{
  spriteEl.hidden = true;
  spriteEl.removeAttribute("src");

  cryEl.hidden = true;
  cryEl.removeAttribute("src");

  resetMoves();
  currentPokemon = null;
}

function showPokemon(p) 
{
  const sprite =
    p.sprites.front_default ||
    p.sprites.other?.["official-artwork"]?.front_default ||
    "";

  const cry = p.cries?.latest || p.cries?.legacy || "";

  if (sprite) {
    spriteEl.src = sprite;
    spriteEl.hidden = false;
  }

  if (cry) {
    cryEl.src = cry;
    cryEl.hidden = false;
    cryEl.load();
  }

  fillMoves(p);

  currentPokemon = {
    id: p.id,
    name: p.name,
    spriteUrl: sprite,
  };
}


function loadTeam() 
{
  const raw = localStorage.getItem(TEAM_KEY);
  if (!raw) return [];
  try { return JSON.parse(raw); } catch { return []; }
}

function saveTeam(team) 
{
  localStorage.setItem(TEAM_KEY, JSON.stringify(team));
}

function renderTeam() 
{
  const team = loadTeam();

  teamListEl.innerHTML = team.map(t => `
    <div class="teamRow">
      <img src="${t.spriteUrl}" alt="${t.name} sprite">
      <ul>
        ${t.moves.map(m => `<li>${m}</li>`).join("")}
      </ul>
    </div>
  `).join("");
}

async function onFind() 
{
  const q = normalizeQuery(queryEl.value);
  if (!q) return;

  setStatus("Loading...");
  clearDisplay();

  try {
    const data = await fetchPokemon(q);
    showPokemon(data);
    setStatus("");
  } catch (e) {
    setStatus(e.message);
  }
}

function onAdd() 
{
  if (!currentPokemon) {
    setStatus("Find a Pokemon first.");
    return;
  }

  const moves = moveSelects.map(s => s.value).filter(Boolean);

  if (moves.length !== 4) {
    setStatus("Pick 4 moves.");
    return;
  }


  const team = loadTeam();
  team.push({ ...currentPokemon, moves });

  saveTeam(team);
  renderTeam();
}


findBtn.addEventListener("click", onFind);
queryEl.addEventListener("keydown", e => {
  if (e.key === "Enter") onFind();
});
addBtn.addEventListener("click", onAdd);


clearDisplay();
renderTeam();