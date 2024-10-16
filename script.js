const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

function downloadImages(imageArray) {
  const fetchedPromises = imageArray.map((image) => {
    return fetch(image.url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to load image's URL: ${image.url}`);
        }
        return image.url;
      });
  });

  Promise.all(fetchedPromises)
    .then((urls) => {
      urls.forEach((url) => {
        const imgElement = document.createElement("img");
        imgElement.src = url;
        output.appendChild(imgElement);
      });
    })
    .catch((err) => {
      console.error(err);
      output.innerHTML = `<p>Error: ${err.message}</p>`;
    });
}

btn.addEventListener("click", () => {
  downloadImages(images);
});
