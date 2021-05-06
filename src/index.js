import $ from 'jquery';
import axios from 'axios';

function renderCard(post) {
    return `
        <div class="col-4 p-card p-notification--information blog-card">
            <div class="">
                <h4>${(post._embedded["wp:term"][1][0].name || " ").toUpperCase()}</h4>
                <hr>
                <img src="${post.featured_media}">
                <h3 class="p-card__content">
                    <a href="${post.link}">${post.title.rendered}</a>
                </h3>
                <p class="p-heading--6">By ${} on ${}</p>
            </div>
        </div>`;
}

function render(data) {
    console.log("This is data parameter in render:", data);
    $('#results').html(data.map(post => renderCard(post)).join(''));
}


axios.get('https://people.canonical.com/~anthonydillon/wp-json/wp/v2/posts.json')
.then(responseJson => {
    render(responseJson.data);
})
.catch(err => {
        console.log("Something went wrong. Error: ", err);
});


