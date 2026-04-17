async function buscar() {
    const buscarCampeao = document.getElementById("busca").value.toLowerCase();
   
    try {
        // Buscando lista de personagens
        const response = await fetch(
            "https://ddragon.leagueoflegends.com/cdn/14.3.1/data/pt_BR/champion.json"
        );

        const data = await response.json();
        const campeoes = Object.values(data.data);

        const campeao = campeoes.find(c =>
            c.name.toLowerCase().includes(buscarCampeao)
        );

        if (!campeao) {
            resultado.innerHTML = "Personagem não encontrado";
            return;
        }

        // Buscando detalhes do personagem,
        const detalhesPersonagem = await fetch(
            `https://ddragon.leagueoflegends.com/cdn/14.3.1/data/pt_BR/champion/${campeao.id}.json`
        );

        const detalhes = await detalhesPersonagem.json();
        const info = detalhes.data[campeao.id];
        const skins = info.skins;

        
        resultado.innerHTML = `<div class="skins"></div>`;
        const skinsContainer = document.querySelector(".skins");

        skins.slice(0, 3).forEach(skin => {
            const card = document.createElement("div");
            card.classList.add("skin-card");

           
            let nomeSkin = skin.name;
            if (!nomeSkin || nomeSkin === "default") {
                nomeSkin = `${info.name} Clássica`;
            }

            card.innerHTML = `
                <img src="https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${info.id}_${skin.num}.jpg">
                <div class="skin-body">
                    <h4>${nomeSkin}</h4>
                </div>
            `;

            skinsContainer.appendChild(card);
        });


        // Info dos personagens)
        const infoDiv = document.createElement("div");
        infoDiv.classList.add("info");

        infoDiv.innerHTML = `
            <h2>${info.name}</h2>
            <p class="title">${info.title}</p>
            <p><strong>Funções:</strong> ${info.tags.join(", ")}</p>
        `;

        resultado.appendChild(infoDiv);

        // Historia do campeão
const loreDiv = document.createElement("div");
loreDiv.classList.add("lore");

loreDiv.innerHTML = `
    <h3>História</h3>
    <p>${info.lore}</p>
`;

resultado.appendChild(loreDiv);

    } catch (erro) {
        resultado.innerHTML = "Erro ao carregar dados";
    }
}