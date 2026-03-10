function fetchPokemon(){
    const pokeInput = document.getElementById("pokeInput");
    let  input= pokeInput.value.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${input}`;

    fetch(url).then(function(res){
        if (res.status != "200"){
            console.log(res);
            pokeImage("./assets/poke404.png");
            pokeName("");
            pokeId("");
            pokeType("");
            document.getElementById("pokeStats").textContent = "";
            document.getElementById("pokeMoves").textContent = "";
            document.getElementById("imgNum").style = "display: none;" ;
        } else if(pokeInput == ""){
            // PROBAR CON TRY Y CATCH PARA ERRORES
            pokeImage("./assets/poke404.png");
            pokeName("");
            pokeId("");
            pokeType("");
            document.getElementById("pokeStats").textContent = "";
            document.getElementById("pokeMoves").textContent = "";
            return;

        } else {
            return res.json();
        }
    }).then(function(data){
        console.log(data);
        let dataImg = data.sprites.front_default;
        let dataId = data.id;
        let dataName = data.name;
        let dataType = data.types[0].type.name;
        let dataStats = data.stats.map(function ({ base_stat, stat }) {
                return `${stat.name}: ${base_stat}`;
            });
        const dataMoves = data.moves.map(function({move}){
                return `${move.name}`;
            });
            console.log(dataMoves);
        pokeName(dataName.toUpperCase());
        pokeImage(dataImg);
        pokeId(dataId);
        pokeType(dataType);
        //pokeStats(dataStats);
        let stats = "";
        dataStats.forEach(pokeStats);

        document.getElementById("pokeStats").textContent = stats;
        function pokeStats(stat){
            stats += `${stat} \n`
        }
        // pokeMoves(dataMoves);
        let moves = "";
        dataMoves.forEach(pokeMoves);
        
        document.getElementById("pokeMoves").textContent = moves;
        function pokeMoves(move){
            moves += `${move} \n`; 
        }
    });
}

function pokeName(name){
    const pokeName = document.getElementById("pokeName");
    pokeName.textContent = name;
}
function pokeImage(url){
    const pokeImg = document.getElementById("pokeImg");
    pokeImg.src = url;
}
function pokeId(num){
    const pokeNum = document.getElementById("pokeId")
    let imgNum = document.getElementById("imgNum");
    imgNum.style.display="";
    pokeNum.textContent =  num;
}
function pokeType(type){
    const pokeType = document.getElementById("pokeType");
    pokeType.textContent = type;
}