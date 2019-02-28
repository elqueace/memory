function uploadImages(){ // stocke les images dans localStorage

    var imgSrc = []; // tableau avec les sources des images ex: C:/users/ameena/images/nom_image.jpg
    var files = document.getElementById("my-input").files;

    for (var i = 0; i < files.length; i++){
        imgSrc[i] = files[i].name;
    }
    for (var j = 0; j < files.length; j++){
        var key = "img"+j; // nom de la clé = img + indice => img1, img2, img3...
        localStorage.setItem(key,imgSrc[j]); // stockage de la source de l'image dans localStorage ex: img1 : img_1.jpg
    }
}

function loadImages() { // charge les images stockées dans localStorage
    var a = 0;
    var id = "img"+a;
	var nbImages = localStorage.length; // s'il n'y a que les images stockées dans le localStorage
    for(var k = 0; k < nbImages; k++){
		id = "img"+k;
        var vraie_src = localStorage.getItem[k];
		var x = document.createElement("IMG");
		x.setAttribute("src", vraie_src);
		x.setAttribute("id", id);
        a++;
		document.body.appendChild(x);
    }

}