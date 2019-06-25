'use strict';



function postData(newText) {

    let newData = {
        'api_key': 'S56LIPrQ3jbqTxiL7hSSIAHHvgZjSrzNoHvJqeUJamE',
        'text': newText
    };
    let formData = [];
    for (var key in newData) {
        var encodedKey = encodeURIComponent(key);
        var encodedValue = encodeURIComponent(newData[key]);
        formData.push(encodedKey + '=' + encodedValue);
    }
    formData = formData.join('&');

    let url = 'https://apis.paralleldots.com/v4/emotion';

    fetch(url, {
            method: 'POST',
            body: formData,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(response => response.json())
        .then(responseJson =>
            displayResults(responseJson, newText))
        .catch(error => showToast('An Error Occurred', error, 'error'));

};

function showToast(heading, text, icon) {
    $.toast({
        heading: heading,
        text: text,
        showHideTransition: 'fade',
        icon: icon
    })

};

function postData2(emotionData) {
    let emotionQuery = emotionData;
    let apiKey = '12822360-cd06965ba9765f6d06f2961c4'
    let apiUrl = `https://pixabay.com/api/?key=${apiKey}&category=people&iamge_type=photo&order=popular&editors_choice=true&q=${emotionQuery}`;
    console.log(apiUrl);
    fetch(apiUrl) //sends specific breed url request to api
        .then(response2 => response2.json()) //turns response into JSON
        .then(responseJson2 =>
            displayResults2(responseJson2))
        .catch(error => showToast('An Error Occurred', error, 'error'));
};

function displayResults2(responseJson2) {
    console.log(responseJson2)

    for (let i = 0; i < responseJson2.hits.length; i++) {
        console.log(responseJson2.hits[Math.floor(Math.random() * 6)]);
        $('section').append(`<img class='newEmotion' src='${responseJson2.hits[i].webformatURL}'></img>`)
    };


};


function displayResults(responseJson, newText) {
    let obj = responseJson.emotion;
    let emotionData = Object.keys(obj).reduce(function(a, b) {
        return obj[a] > obj[b] ? a : b
    });
    console.log(obj);
    console.log(emotionData);
    postData2(emotionData);
    let newHappy = Math.trunc(responseJson.emotion.Happy * 100) + '%';
    let newAngry = Math.trunc(responseJson.emotion.Angry * 100) + '%';
    let newFear = Math.trunc(responseJson.emotion.Fear * 100) + '%';
    let newBored = Math.trunc(responseJson.emotion.Bored * 100) + '%';
    let newSad = Math.trunc(responseJson.emotion.Sad * 100) + '%';
    let newExicted = Math.trunc(responseJson.emotion.Excited * 100) + '%';
    $('section').append(`<h3 class='newEmotion'>You said: </h3><br class='newBreak'><div class='responseResult'><p class='newEmotion'>${newText}</p></div><br class='newBreak'><h1 class = 'newEmotion'>Here are the results: </h1><p class='newEmotion'>You are feeling ${newHappy} Happy!</p><p class='newEmotion'>You are feeling ${newAngry} Angry!</p><p class='newEmotion'>You are feeling ${newFear} Fear!</p><p class='newEmotion'>You are feeling ${newBored} Bored!</p><p class='newEmotion'>You are feeling ${newSad} Sad!</p><p class='newEmotion'>You are feeling ${newExicted} Excited!</p><br class='newBreak'><p class='newEmotion'>You mainly are feeling <b><u>${emotionData}</b></u>!</p>`);
    $('.results').removeClass('hidden');

};

function watchForm2() {
    $('#start').submit(event => {
        event.preventDefault();
        $('.starts').addClass('hidden');
        $('#circle_container').addClass('hidden');
        $('#stars').addClass('hidden');
        $('#load_wrapper').addClass('hidden');
        $('#sun').addClass('hidden');
        $('#moon').addClass('hidden');
        $('.enteredText').removeClass('hidden');
        $('.wrapper').removeClass('hidden');

        watchForm();
    });
};




function watchForm() {
    $('#paper').submit(event => {
        event.preventDefault();
        setTimeout(() => {
            $('html, body').animate({
                    scrollTop: $('#dank').position().top
                },
                500
            );
        }, 1000)


        $('.newEmotion').remove();
        $('.newHeader').remove();
        $('.newBreak').remove();

        let newText = $('.enteredText').val();
        $('.enteredText').val("");
        if (!newText || newText == "") {
            showToast('Sorry!', 'Text cannot be blank', 'error')
            return
        } else {
            showToast('Success!', 'Scroll Down To See Results!', 'success');
        }

        postData(newText);
    });
};
$(function() {
    console.log('App loaded! Waiting for submit!');

    watchForm2();
});

jQuery(document).ready(function($) {

    // Define a blank array for the effect positions. This will be populated based on width of the title.
    var bArray = [];
    // Define a size array, this will be used to vary bubble sizes
    var sArray = [4, 6, 8, 10];

    // Push the header width values to bArray
    for (var i = 0; i < $('.bubbles').width(); i++) {
        bArray.push(i);
    }

    // Function to select random array element
    // Used within the setInterval a few times
    function randomValue(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    // setInterval function used to create new bubble every 350 milliseconds
    setInterval(function() {

        // Get a random size, defined as variable so it can be used for both width and height
        var size = randomValue(sArray);
        // New bubble appeneded to div with it's size and left position being set inline
        // Left value is set through getting a random value from bArray
        $('.bubbles').append('<div class="individual-bubble" style="left: ' + randomValue(bArray) + 'px; width: ' + size + 'px; height:' + size + 'px;"></div>');

        // Animate each bubble to the top (bottom 100%) and reduce opacity as it moves
        // Callback function used to remove finsihed animations from the page
        $('.individual-bubble').animate({
            'bottom': '100%',
            'opacity': '-=0.7'
        }, 3000, function() {
            $(this).remove()
        });


    }, 350);
});
