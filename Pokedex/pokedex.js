window.onload = function() {
    const pokedex = document.getElementById("result");
    var pokemons;
    const fetchPokemon = (callback) => {
        const promises = [];
        for (let i = 1; i <= 802; i++) {
            const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
            promises.push(fetch(url).then((res) => res.json()));
        }

        Promise.all(promises).then((results) => {
            console.log(results);
            pokemons = results.map((data) => ({
                name: data.name,
                id: data.id,
                image: data.sprites['front_default'],
                type: data.types.map((type) => type.type.name).join(','),
                height: data.height
            }));

            if (typeof callback == "function")
                callback();
        });
    };

    const displayPokemon = (pokemon) => {
        console.log(pokemon);
        const pokemonString = pokemon
            .map(
                (pokeman) =>
                `
            <li class="card" onclick=\"exibirPopUp(${pokeman.id})\">
                <h2 class="card-title">${pokeman.id}. ${pokeman.name} ${pokeman.index}</h2>
                <img class="card-image" src="${pokeman.image}"/>
                <p class="card-subtitle">Type: ${pokeman.type}</p>
            </li>
        `
            )
            .join('');
        pokedex.innerHTML = pokemonString;
    };

    fetchPokemon(setEvent);

    function setEvent() {

        displayPokemon(pokemons);

        function getPokemonsByName() {
            var nome = document.getElementById("filtrar-nome").value;

            displayPokemon(pokemons.filter(function(obj) {
                if (obj.name.indexOf(nome) >= 0)
                    return true;
                return false;
            }))
        }

        function getPokemonsByType() {
            var tipo = document.getElementById("filtrar-tipo").value;

            displayPokemon(pokemons.filter(function(obj) {
                if (tipo == "all")
                    return true;
                else if (obj.type.indexOf(tipo) >= 0)
                    return true;
                return false;
            }))
        }


        function getPokemonByOrdem() {
            var ordem = document.getElementById("ordem").selectedIndex;

            var ordenacao;
            switch (ordem) {
                case 0:
                    ordenacao = function(a, b) {
                        if (a.height > b.height) {
                            return 1;
                        }
                        if (a.height < b.height) {
                            return -1;
                        }

                        return 0;
                    }
                    break;
                case 1:
                    ordenacao = function(a, b) {
                        if (a.height > b.height) {
                            return -1;
                        }
                        if (a.height < b.height) {
                            return 1;
                        }

                        return 0;
                    }
                    break;
                case 2:
                    ordenacao = function(a, b) {
                        if (a.name > b.name) {
                            return 1;
                        }
                        if (a.name < b.name) {
                            return -1;
                        }

                        return 0;
                    }
                    break;
                default:
                    ordenacao = function(a, b) {
                        if (a.name > b.name) {
                            return -1;
                        }
                        if (a.name < b.name) {
                            return 1;
                        }

                        return 0;
                    }
            }

            displayPokemon(pokemons.sort(ordenacao));

        }

        document.getElementById("filtrar-nome").addEventListener("input", getPokemonsByName)
        document.getElementById("filtrar-tipo").addEventListener("change", getPokemonsByType)
        document.getElementById("ordem").addEventListener("change", getPokemonByOrdem)
    }


};

function exibirPopUp(id) {
    document.getElementById("popUp").style.display = "block";
    document.getElementById("infoPopUp").innerHTML = id;
}

function fecharPop() {
    document.getElementById("popUp").style.display = "none";
    document.getElementById("infoPopUp").innerHTML = "";
}