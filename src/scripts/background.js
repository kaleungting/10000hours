function getPhotos() {
  return $.ajax({
    method: "GET",
      url: "https://api.unsplash.com/photos/?client_id=YOUR_ACCESS_KEY",
    data: { search },
  });
}
