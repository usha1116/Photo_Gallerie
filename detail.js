window.onload = function () {
    const location = window.location.href;
    const url = new URL(location);
    const search_params = new URLSearchParams(url.search);

    if (!search_params.has('id') || search_params.get('id') == "") {
        window.location.href = './';
    }
    fetch(`https://api.unsplash.com/photos/${search_params.get('id')}?client_id=${API_KEY}`).then(convert_to_json)
        .then(function (data) {
            loadDetail(data);

            document.getElementById('image-id').innerText=search_params.get('id');
        });
}

function loadDetail(data) {
    console.log(data);
    document.getElementById('detail-image').src = data.urls.regular;
    document.getElementById('detail-image').style.borderColor=data.color;

    document.getElementById('description-text').innerText = data.description;
    document.getElementById('username').innerText = data.user.username;
    document.getElementById('like-count').innerText = data.likes;
    document.getElementById('view-count').innerText = data.views;
    document.getElementById('alt-description').innerText = data.alt_description;
    document.getElementById('image-color').style.backgroundColor = data.color;
    document.getElementById('color-text').innerText = data.color;
    document.getElementById('download-link').href = data.links.download;
    

    const date=new Date(data.created_at)
    const upload_date = `${date.getUTCDate()}/${date.getUTCMonth()+1}/${date.getUTCFullYear()}`;
    document.getElementById('upload-date').innerText=upload_date;
}