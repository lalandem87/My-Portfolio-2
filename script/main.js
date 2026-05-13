async function getData() {
  try {
    const request = await fetch("../backend/data.json");
    if (request.ok) {
      const data = await request.json();
      return data;
    }
  } catch (exception) {
    console.error(`Exception: ${exception}`);
  }
}

function setTerminal() {
  const lines = [
    { selector: ".whoami", delay: 300 },
    { selector: ".nmap", delay: 800 },
    { selector: ".bash", delay: 1400 },
    { selector: ".john", delay: 2000 },
    { selector: ".cat", delay: 2600 },
    { selector: ".cmd-wait", delay: 3200 },
  ];

  document
    .querySelectorAll(".whoami,.nmap, .bash, .john, .cat, .cmd-wait")
    .forEach((el) => {
      el.style.opacity = "0";
      el.style.transition = "opacity 0,3s";
    });

  lines.forEach(({ selector, delay }) => {
    setTimeout(() => {
      const el = document.querySelector(selector);
      if (el) {
        el.style.opacity = "1";
      }
    }, delay);
  });
}

async function setExpertiseCards() {
  const data = await getData();
  if (data) {
    const expertiseData = data["expertise"];
    const container = document.querySelector(".expertise-cards");

    expertiseData.forEach((data) => {
      container.insertAdjacentHTML(
        "beforeend",
        `
                <div class="card-expertise">
                    <div class="logo">${data.tag}</div>
                    <h3>${data.name}</h3>
                    <p>${data.desc}</p>
                    <ul>
                        <li>${data.type[0]}</li>
                        <li>${data.type[1]}</li>
                        <li>${data.type[2]}</li>
                    </ul>
                </div>
                `,
      );
    });
  }
}

async function setSkillCards() {
  const data = await getData();
  if (data) {
    const developpement = data["skills"]["devweb"];
    const cybersec = data["skills"]["cybersec"];

    const containerDev = document.querySelector(".skills-dev");
    const containerCyber = document.querySelector(".skills-cyber");

    Object.entries(developpement).forEach(([key, value]) => {
      containerDev.insertAdjacentHTML(
        "beforeend",
        `
        <div class="skill-bar">
          <div class="skill-label">
            <span>${key}</span>
            <span class="pourcents hot">${value}</span>
          </div>
          <div class="bar">
          <div class="bar-fill" style="width: ${value}"></div>
          </div>
        </div>
        `,
      );
    });

    cybersec.forEach((skill) => {
      containerCyber.insertAdjacentHTML(
        "beforeend",
        `
        <div class="badge">
          <h4>${skill}</h4>
        </div>
        `,
      );
    });
  }
}

async function setProjectsCard() {
  const data = await getData();
  if (data) {
    const projectsData = data["projects"];
    const container = document.querySelector(".project-cards");

    projectsData.forEach((proj) => {
      container.insertAdjacentHTML(
        "beforeend",
        `
        <div class="card">
          <div class='proj-img'>
            <img src="${proj.image}" alt="${proj.name}">
          </div>
          <div class="info">
            <h3 class="title">${proj.name}</h3>
            <p class="proj-desc">${proj.desc}</p>
            <div class="badges">
              ${proj.langages.map((lang) => `<span class="badge">${lang}</span>`).join("")}
            </div>
          </div>
        </div>
        `,
      );
    });
  }
}

async function setDefiCards() {
  const data = await getData();
  if (data) {
    const offerData = data["offer"];
    const container = document.querySelector(".defi-cards");

    offerData.forEach((offer) => {
      if (offer.name === "Développeur Web") {
        container.insertAdjacentHTML(
          "beforeend",
          `
            <div class="card">
              <span class="hot">FS</span>
              <h3>${offer.name}</h3>
              <p>${offer.desc}</p>
              <ul>
                <li>stack: ${offer.stack}</li>
                <li>${offer.objectif}</li>
              </ul>
              <em>${offer.type}</em>
            </div>
          `,
        );
      } else {
        container.insertAdjacentHTML(
          "beforeend",
          `
            <div class="card">
              <span class="hot">CS</span>
              <h3>${offer.name}</h3>
              <p>${offer.desc}</p>
              <ul>
                <li>${offer.stack}</li>
                <li>${offer.objectif}</li>
              </ul>
              <em>${offer.type}</em>
            </div>
          `,
        );
      }
    });
  }
}

setTerminal();
setExpertiseCards();
setSkillCards();
setProjectsCard();
setDefiCards();
