import $ from 'jquery';
import axios from 'axios';

function renderCard(post) {
    let date = new Date(post.date);
    let options = { month: 'short'};
    return `
        <div class="col-4 p-card p-notification--information blog-card">
            <div>
                <h4 class="tag-name">${(post._embedded["wp:term"][1][0].name || " ").toUpperCase()}</h4>
                <hr>
                <img src="${post.featured_media}">
                <h3 class="p-card__content">
                    <a href="${post.link}">${post.title.rendered}</a>
                </h3>
                <p class="p-heading--6">By <a 
                    href="${post._embedded.author[0].link || " "}">${post._embedded.author[0].name || " "}</a> on 
                    ${date.getDate()} ${new Intl.DateTimeFormat('en-US', options).format(date)} ${date.getFullYear()}
                </p>
            </div>
            <div class="card-bottom">
                    <hr>
                    <h4>${post._embedded["wp:term"][0][0].name || " "}</h4>
                </div>
        </div>`;
}

function render(data) {
    $('#results').html(data.map(post => renderCard(post)).join(''));
}

function getData() {
    axios.get('https://people.canonical.com/~anthonydillon/wp-json/wp/v2/posts.json')
    .then(responseJson => {
        render(responseJson.data);
    })
    .catch(err => {
            console.log("Something went wrong. Error: ", err);
    });
}

$(getData);


