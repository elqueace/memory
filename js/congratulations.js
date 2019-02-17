function playAudio() {

    var randomNb = Math.floor((Math.random() * 3));
    if(randomNb == 0)
    {   congrats0.load();
          congrats0.play();
        congrats0.currentTime = 0;

    }else if(randomNb == 1)
    {       congrats1.load();
          congrats1.play();
        congrats1.currentTime = 0;

    }else if(randomNb == 2)
    {       congrats2.load();
          congrats2.play();
        congrats2.currentTime = 0;

    }
}
