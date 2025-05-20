function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const main = document.getElementById('main');
    sidebar.classList.toggle('active');
    main.classList.toggle('shift');
  }



let selectedCountry = null;
let matchCount = 0;
const connections = {};

function getRandomColor() {
  const hue = (matchCount * 60) % 360;
  return `hsl(${hue}, 70%, 50%)`;
}

function selectCountry(element) {
  const countryId = element.getAttribute('data-id');

  if (selectedCountry) {
    selectedCountry.classList.remove('selected');
  }

  if (connections[countryId]) {
    const { line, characteristic, countryElem } = connections[countryId];

    line.remove();

    countryElem.classList.remove('matched');
    countryElem.style.backgroundColor = '';
    characteristic.classList.remove('matched');
    characteristic.style.backgroundColor = '';

    delete connections[countryId];
  }

  selectedCountry = element;
  selectedCountry.classList.add('selected');
}

function selectCharacteristic(element) {
  if (!selectedCountry) return;

  const countryId = selectedCountry.getAttribute('data-id');
  const color = getRandomColor();

  // Optional: prevent double match for same characteristic
  for (const key in connections) {
    if (connections[key].characteristic === element) {
      return;
    }
  }

  selectedCountry.style.backgroundColor = color;
  element.style.backgroundColor = color;
  selectedCountry.classList.add('matched');
  element.classList.add('matched');

  const line = drawConnection(selectedCountry, element, color);

  connections[countryId] = {
    characteristic: element,
    countryElem: selectedCountry,
    line: line,
    color: color
  };

  selectedCountry.classList.remove('selected');
  selectedCountry = null;
  matchCount++;
}

function drawConnection(elem1, elem2, color) {
  const svg = document.getElementById("connections");

  const rect1 = elem1.getBoundingClientRect();
  const rect2 = elem2.getBoundingClientRect();
  const svgRect = svg.getBoundingClientRect();

  const x1 = rect1.left + rect1.width / 2 - svgRect.left;
  const y1 = rect1.top + rect1.height / 2 - svgRect.top;
  const x2 = rect2.left + rect2.width / 2 - svgRect.left;
  const y2 = rect2.top + rect2.height / 2 - svgRect.top;

  const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line.setAttribute("x1", x1);
  line.setAttribute("y1", y1);
  line.setAttribute("x2", x2);
  line.setAttribute("y2", y2);
  line.setAttribute("stroke", color);
  line.setAttribute("stroke-width", 3);

  svg.appendChild(line);
  return line;
}

