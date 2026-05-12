async function getData() {
    try {
        const request = await fetch("../backend/data.json");
        if(request.ok){
            const data = await request.json();
            return data;
        }
    } catch (exception) {
        console.error(`Exception: ${exception}`);
    }
}

function setTerminal(){
    const lines = [
        { selector: '.whoami', delay: 300 },
        { selector: '.nmap', delay: 800 },
        { selector: '.bash', delay: 1400 },
        { selector: '.john', delay: 2000 },
        { selector: '.cat', delay: 2600 },
        { selector: '.cmd-wait', delay: 3200 },
    ];

    document.querySelectorAll('.whoami,.nmap, .bash, .john, .cat, .cmd-wait').forEach(el => {
        el.style.opacity = "0";
        el.style.transition = "opacity 0,3s";
    });

    lines.forEach(({selector, delay}) => {
        setTimeout(() => {
            const el = document.querySelector(selector);
            if(el){
                el.style.opacity = "1";
            }
        }, delay);
    });
}

async function setCardsExpertise() {
    const data = await getData();
    if(data){
        const expertiseData = data["expertise"];
        const container = document.querySelector(".expertise-cards");

        expertiseData.forEach(data => {
            container.insertAdjacentHTML('beforeend', 
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
                `
            )
        });
    }
}

setTerminal();
setCardsExpertise();

