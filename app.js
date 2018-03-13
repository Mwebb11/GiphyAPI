var topics = ["Orcs","Goblins","fairies","Trolls","Gnomes"];

function getData(){
    $("#fantasypics").empty();
    var topic = $(this).attr("data-name");
    console.log(this);
    console.log(topic);
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=hZuhqXPIbwcB64O6YuiR6boIAJ6iHg8o"
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        var data = response.data
        console.log(data);
        for (var j=0; j<data.length;J++ ){
            var imgUrlStill = data[j].images.fixed_width_still.url;
            var imgUrlAnimated = data[j].images.fixed_width.url;
            var rating = $("<p>").html("Rating:"+" "+data[j].rating);
            var imgcontainer = $("<div>").attr("class","picandtext");
            imgcontainer.append($("<img>").attr({"src":imgUrlStill,"data-state":"still","data-still-url":imgUrlStill,"class":"clickme","data-animated-url":imgUrlAnimated}));
            imgcontainer.prepend(rating);
            $("#fantasypics").append(imgcontainer);
        }
    });
    createButtons();
    $(".clickme").on("click",function(event){
        event.preventDefault();
        var currentState = $(this).attr("data-state");
        if(currentState === "still"){
            $(this).attr("src",$(this).attr("data-animated-url"))
            $(this).attr("data-state","data-animated")
        }else{
            $(this).attr("src",$(this).attr("data-still-url"));
            $(this).attr("data-state","still");
        }
    });
    
}

function createButtons(){
    $("#fantasies").empty();
    for(var i=0; i<topics.length; i++){
        var button = $("<button>").attr({"class":"fantasy btn btn-primary","data-name":topics[i], "type":button});
        button.text(topics[i]);
        $("#fantasies").append(button);
    }
};
$("#addfantasy").on("click",function(event){
    event.preventDefault();
    var newFantasy = $("#fantasy-input").val().trim();
    topics.push(newFantasy);
    $("#fantasy-input").val("");
    getData();
    createButtons();
})

$(document).on("click","#fantasy", getData());
createButtons();
