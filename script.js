document.addEventListener("DOMContentLoaded", function () {
    fetch("https://api.github.com/repos/hemangkeswani12/webp/contents/images")
        .then(response => response.json())
        .then(data => {
            let media = data.filter(file => file.name.match(/\.(jpg|jpeg|png|gif|mp4)$/i));
            let gallery = document.querySelector(".gallery");
            let index = 0;

            function showNextMedia() {
                if (media.length === 0) return;
                if (index >= media.length) index = 0;
                
                let file = media[index++];
                let element;

                if (file.name.endsWith(".mp4")) {
                    element = document.createElement("video");
                    element.src = file.download_url;
                    element.autoplay = true;
                    element.loop = true;
                    element.muted = true;
                } else {
                    element = document.createElement("img");
                    element.src = file.download_url;
                }

                element.classList.add("floating-media");
                element.style.left = `${Math.random() * 90}%`;
                gallery.appendChild(element);

                // Fade out smoothly and remove element
                setTimeout(() => {
                    element.style.opacity = "0";
                    setTimeout(() => gallery.removeChild(element), 1000);
                }, 4000); // Stay visible for 4s

                setTimeout(showNextMedia, 500); // Adds a new image every 0.5s
            }

            showNextMedia();
        })
        .catch(error => console.error("Error loading media:", error));
});
