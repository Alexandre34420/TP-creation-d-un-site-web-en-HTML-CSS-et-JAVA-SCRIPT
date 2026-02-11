console.log("Je suis la console !");
var attempt = 0;

function quizAlert() {
    alert("Vous êtes sur le point de commencer le quiz !");
    quizConfirm();

function quizConfirm() {
    var infos = document.querySelectorAll("#informations input");
     for (var i = 0; i < infos.length; i++) { 
        if (infos[i].value.trim() === "") { 
            alert("Veuillez remplir tous les champs !"); 
            return;
         }
     }
    var res = confirm("Etes-vous sûr de vouloir continuer ?");
    if (res == true) {
        alert("Le quiz va commencer dans 5 secondes !");
        //ajouter un décompte de 5 secondes
        var timer = 5;
        //Créer un élément p pour afficher le message
        var confirmation = document.createElement("p");
        confirmation.textContent = timer + " secondes";
        //style du message
        confirmation.style.color = "red";
        confirmation.style.fontSize = "1.5em";
        confirmation.style.fontWeight = "bold";
        confirmation.style.textAlign = "center";
    //ajouter le message à la page à la suite du bouton d'id start
        var start = document.getElementById("informations");
        start.appendChild(confirmation);
        //en utilisant la fonction setInterval qui s'exécute toutes les secondes
        var interval = setInterval(function () {
        //décrémenter le décompte
            timer--;
        //On l’affiche également dans la console
            console.log(timer);
            //afficher le décompte dans l’élément p créé
            confirmation.textContent = timer + " secondes";
            //si le décompte est terminé
            //afficher le message "C'est parti ! Bonne chance !"
            //afficher le formulaire
            //afficher le bouton de soumission
            if (timer == 0) {
                clearInterval(interval);
                confirmation.textContent = "C'est parti ! Bonne chance !";
                var infos = document.querySelectorAll("#informations input"); 
                infos.forEach(function (champ) { 
                    champ.disabled = true; 
                });
                document.getElementById("startQuiz").style.display = "none";
                document.getElementsByClassName("quiz")[0].style.display = "block";
                document.getElementsByTagName("button")[1].style.display = "block";
            }
        }, 1000);
    } else {
        alert("Vous allez être redirigé vers la page d'accueil !");
        window.location.href = "accueil.html";

    }
}
}

function submitQuiz() {
    var score = 0;
    var q1 = document.querySelector('input[name="q1"]:checked');
    if (q1 && q1.value === "a") {
        score += 4;
    }
    var q2 = document.querySelector('input[name="q2"]:checked');

    q2.forEach(function (checkbox) {
            if (checkbox.value === "a" || checkbox.value === "b"){
                score += 3;
            } else if (checkbox.value === "c") {
                score -= 3;
            
        }
    });
    var q3 = document.getElementById("q3").value.toLowerCase();

    var keywords = ["réduire", "alléger", "faciliter", "optimiser", "exploiter"];

    for (var i = 0; i < keywords.length; i++) {
        if (q3.includes(keywords[i])) {
            score += 10;
            break;
        }
    }
    attempt++;
    var tbody = document.querySelector("#result tbody");
    var row = document.createElement("tr");

    var cellAttempt = document.createElement("td");
    var cellScore = document.createElement("td");

    attemptCell.textContent = attempt;
    scoreCell.textContent = score;

    row.appendChild(cellAttempt);
    row.appendChild(cellScore);
    tbody.appendChild(row);

    var radios = document.querySelectorAll('input[name="q1"]');
    radios.forEach(r => r.checked = false);
    var checkboxes = document.querySelectorAll('input[name="q2"]');
    checkboxes.forEach(c => c.checked = false);
    document.getElementById("q3").value = "";

    if (attempt >= 3) {
        var submitBtn = document.querySelector('input[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.style.opacity = "0.5";
        submitBtn.style.cursor = "not-allowed";
        alert("Vous avez atteint le nombre maximum de tentatives !");
    }
}


