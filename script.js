// ===============================
// INITIALISATION
// ===============================


const screens = document.querySelectorAll(".screen");


function showScreen(id){

    screens.forEach(screen => {

        screen.classList.remove("active");

    });

    document.getElementById(id).classList.add("active");

}




// ===============================
// PHASE 1 : JEU DU MOT
// ===============================


const secretWord = "OXPHANDINE";

let currentLetters = [];

let currentIndex = 0;



const wordLines = document.getElementById("word-lines");

const lettersContainer = document.getElementById("letters-container");

const deleteLetter = document.getElementById("delete-letter");




// Création des 10 traits

secretWord.split("").forEach(()=>{

    let trait = document.createElement("span");

    wordLines.appendChild(trait);

});





// Création des lettres aléatoires


const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";


let randomLetters = [];



while(randomLetters.length < 15){

    let letter = alphabet[Math.floor(Math.random()*alphabet.length)];

    if(!randomLetters.includes(letter) && !secretWord.includes(letter)){

        randomLetters.push(letter);

    }

}



randomLetters = [

    ...randomLetters.slice(0,15)

];





// Mélange avec les vraies lettres

let displayLetters = [

    ...secretWord.split(""),

    ...randomLetters

];



displayLetters.sort(()=>Math.random()-0.5);






displayLetters.forEach(letter=>{


    let button=document.createElement("button");


    button.textContent=letter;


    button.addEventListener("click",()=>{


        if(currentIndex < secretWord.length){


            currentLetters.push(letter);


            wordLines.children[currentIndex].textContent=letter;


            currentIndex++;


            checkWord();


        }


    });



    lettersContainer.appendChild(button);


});







// Suppression dernière lettre


deleteLetter.addEventListener("click",()=>{


    if(currentIndex>0){


        currentIndex--;


        currentLetters.pop();


        wordLines.children[currentIndex].textContent="";


    }


});






// Vérification


function checkWord(){


    if(currentIndex === secretWord.length){


        let attempt=currentLetters.join("");



        if(attempt===secretWord){


            setTimeout(()=>{


                showScreen("screen-confirm");


                startConfirmation();


            },800);



        }

        else{


            setTimeout(()=>{


                currentLetters=[];

                currentIndex=0;


                for(let i=0;i<secretWord.length;i++){

                    wordLines.children[i].textContent="";

                }


            },800);


        }


    }


      }
// ===============================
// PHASE 1 - ECRAN 2 CONFIRMATION
// ===============================


const confirmationMessage =
"Laissez-moi le temps de confirmer que vous êtes vraiment Houéfa";


const confirmationText =
document.getElementById("confirmation-text");


const progressBar =
document.getElementById("progress-bar");


const failureMessage =
document.getElementById("failure-message");




function startConfirmation(){


    confirmationText.textContent="";

    let i=0;


    let typing=setInterval(()=>{


        confirmationText.textContent += confirmationMessage[i];

        confirmationText.style.opacity=1;

        i++;


        if(i>=confirmationMessage.length){


            clearInterval(typing);


            setTimeout(startProgress,1000);


        }


    },70);



}





function startProgress(){


    let progress=0;


    let speed;



    let timer=setInterval(()=>{


        speed=Math.random()*3+1;


        progress+=speed;


        if(progress>=97){


            progress=97;


            clearInterval(timer);



            setTimeout(()=>{


                failureMessage.style.opacity=1;


                setTimeout(()=>{


                    showScreen("screen-code");


                },2500);



            },800);


        }



        progressBar.style.width=progress+"%";



    },150);



}








// ===============================
// ECRAN 3 : CODE IPHONE
// ===============================


const correctPin="323266";


let enteredPin="";



const pinDots=document.querySelectorAll("#pin-display span");

const numberButtons=document.querySelectorAll("#number-pad button");

const deletePin=document.getElementById("delete-pin");


const bravo=document.getElementById("bravo");

const startAdventure=
document.getElementById("start-adventure");






numberButtons.forEach(button=>{


    button.addEventListener("click",()=>{


        let value=button.textContent;



        if(value!=="" && enteredPin.length<6){


            enteredPin+=value;


            updateDots();


        }



        checkPin();


    });


});





function updateDots(){


    pinDots.forEach((dot,index)=>{


        if(index < enteredPin.length){

            dot.style.background="white";

        }

        else{

            dot.style.background="transparent";

        }


    });



}





deletePin.addEventListener("click",()=>{


    enteredPin=enteredPin.slice(0,-1);


    updateDots();


});







function checkPin(){


    if(enteredPin.length===6){



        if(enteredPin===correctPin){



            setTimeout(()=>{


                document.querySelector(".neon-frame").style.opacity=0;


                setTimeout(()=>{


                    bravo.style.display="block";



                    setTimeout(()=>{


                        startAdventure.style.display="block";


                    },5000);



                },1000);



            },500);



        }

        else{


            enteredPin="";


            updateDots();


        }



    }



}




startAdventure.addEventListener("click",()=>{


    startExperience();


});
// ===============================
// PHASE 2 : AVENTURE
// ===============================


const adventure =
document.getElementById("adventure");


const slideImage =
document.getElementById("slide-image");


const music1 =
document.getElementById("music1");


const storyText =
document.getElementById("story-text");




// Liste des images

const images = [

"assets/images/image1.png",
"assets/images/image2.png",
"assets/images/image3.png"

];



let lastImage = "";





function startExperience(){


    showScreen("adventure");


    music1.volume=1;

    music1.play();



    startSlideshow();


    startStory();



}





// ===============================
// DIAPORAMA
// ===============================



function startSlideshow(){


    changeImage();


    setInterval(()=>{


        changeImage();


    },6000);



}




function changeImage(){



    let nextImage;



    do{


        nextImage =
        images[Math.floor(Math.random()*images.length)];


    }

    while(nextImage===lastImage);



    lastImage=nextImage;



    slideImage.classList.add("fade-out");



    setTimeout(()=>{


        slideImage.src=nextImage;


        slideImage.classList.remove("fade-out");



    },2000);



}








// ===============================
// TEXTE EMOTIONNEL
// ===============================



const phrases = [

"Aujourd'hui est un jour béni.",
"C'est le jour de ta naissance.",
"C'est ma date préférée sur le calendrier.",
"C’est le moment idéal pour faire une pause.",
"C’est l’instant parfait pour célébrer la vie.",
"Et surtout, pour célébrer ta vie.",
"Je veux te dire à quel point tu es unique.",
"Tu possèdes une lumière bien à toi.",
"Ton entrée dans une pièce change l’ambiance.",
"Ton sourire a le pouvoir d'effacer mes pires journées.",
"Ton rire est ma mélodie favorite.",
"Il résonne en moi comme un bonheur pur.",
"Avec toi, tout devient plus simple.",
"Les moments ordinaires deviennent magiques.",
"Les dimanches pluvieux deviennent chaleureux.",
"Tu transformes mon quotidien en un voyage merveilleux.",
"Je regarde le chemin parcouru à tes côtés.",
"Chaque jour est une chance.",
"Chaque regard échangé est un cadeau.",
"Tu m'apportes un équilibre parfait.",
"Tu es ma force quand je doute.",
"Tu es ma douceur quand le monde est trop dur.",
"Un cœur pur et vibrant.",
"Je suis tellement fier de partager ta vie.",
"Je suis tellement chanceux d'être celui qui t'accompagne.",
"Pour cette nouvelle année, je te souhaite le meilleur.",
"Je te souhaite une pluie de petits bonheurs.",
"Des bonheurs simples mais profonds.",
"Une bonne tasse de café le matin.",
"Des éclats de rire avec tes proches.",
"Des moments de paix totale.",
"Je te souhaite aussi de grandes victoires.",
"Que tes projets professionnels se concrétisent.",
"Que tes passions s'épanouissent encore plus.",
"Ne doute jamais de tes capacités.",
"Tu as une force incroyable en toi.",
"Suis tes rêves sans hésiter.",
"Je serai toujours juste derrière toi pour te soutenir.",
"Je serai ton premier supporter, comme toujours.",
"Imaginons maintenant notre avenir.",
"Il est rempli de promesses.",
"J'ai hâte de continuer ce voyage avec toi.",
"Hâte de découvrir de nouveaux endroits à tes côtés.",
"Hâte de partager des milliers d'autres repas.",
"De discuter pendant des heures au milieu de la nuit.",
"De refaire le monde sous les étoiles.",
"Nous avons encore tant de souvenirs à construire.",
"Tant d'histoires à écrire ensemble.",
"Notre complicité est notre plus beau trésor.",
"Prenons-en soin chaque jour.",
"Aujourd'hui, c'est ta journée exclusive.",
"Oublie toutes les petites contrariétés.",
"Laisse de côté le stress.",
"Pense uniquement à toi.",
"Laisse-toi chouchouter par tout le monde.",
"Laisse-toi submerger par les marques d'affection.",
"Tu mérites toute l'attention de la Terre.",
"Merci d'exister, tout simplement.",
"Merci d'être cette femme extraordinaire.",
"Merci pour ton amour inconditionnel.",
"Merci pour ta patience et ton soutien.",
"Tu es mon repère, ma maison, mon amour.",
"Je t'aime infiniment.",
"Merveilleux et joyeux anniversaire, ma chérie."

];

let phraseIndex=0;





function startStory(){


    showNextPhrase();



}





function showNextPhrase(){



    if(phraseIndex>=phrases.length){



        endStory();



        return;


    }



    storyText.textContent=phrases[phraseIndex];



    storyText.style.opacity=0;



    setTimeout(()=>{


        storyText.style.opacity=1;



    },200);





    setTimeout(()=>{


        storyText.style.opacity=0;



        phraseIndex++;



        setTimeout(showNextPhrase,700);



    },2700);



}
// ===============================
// FIN DE L'AVENTURE
// ===============================


const birthdayVideo =
document.getElementById("birthday-video");


const fireworks =
document.getElementById("fireworks");


const music2 =
document.getElementById("music2");


const epilogue =
document.getElementById("epilogue");





function endStory(){


    // baisse progressive musique 1

    fadeOutMusic();



    setTimeout(()=>{


        launchVideo();



    },3000);



}





// ===============================
// FADE MUSIQUE 1
// ===============================


function fadeOutMusic(){


    let volume = music1.volume;



    let fade = setInterval(()=>{


        volume -= 0.05;


        if(volume <= 0){


            volume=0;


            music1.pause();


            clearInterval(fade);


        }


        music1.volume=volume;



    },200);



}





// ===============================
// VIDEO ANNIVERSAIRE
// ===============================


function launchVideo(){



    showScreen("adventure");



    slideImage.style.display="none";


    storyText.style.display="none";



    birthdayVideo.style.display="block";



    birthdayVideo.currentTime=0;


    birthdayVideo.play();



    birthdayVideo.onended=()=>{


        launchFireworks();


    };



}





// ===============================
// FEU D'ARTIFICE
// ===============================


function launchFireworks(){



    birthdayVideo.style.display="none";


    fireworks.style.display="block";


    fireworks.currentTime=0;


    fireworks.play();



    fireworks.onended=()=>{


        launchEpilogue();


    };



}





// ===============================
// EPILOGUE
// ===============================


function launchEpilogue(){



    showScreen("epilogue");



    music2.volume=1;


    music2.play();



    music2.onended=()=>{


        document.body.classList.add("fade-out");


    };



}
