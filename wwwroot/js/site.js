$(document).ready(function()
{
    // Game Master Data
    var GameMaster;

    var TrashTalk = ["It's like seabiscuit in the third race.", "Gross!", "Don't try too hard.", "Justin is my css-wife.", "What's wrong with you?", "You're a very large child.", "You're like a monkey with cymbals", "You should get back to work.", "You look like a D"];

    var Shakespearian = ["Thou art a crooked bog!", "Thou art a thin faced plague!", "Thou art a slothful dog!", "Thou art a deformed coward!", "Thou art a foolish ape!", "Thou art an ordinary double villain!", "Thou art an unnecessary carbuncle!", "Thou art a crusty nit!", "Thou art a whining maltworm!", "Thou art a slothful commoner!"];

    var MontyPython = ["It's only a flesh wound...", "My sister was bit by a moose", "Moose bites can be pretti nasti", "I'll do you for that!", "Bring out the holy hand grenade of Antioch!", "Ni!!", "Help help! I'm being oppressed!", "I'll bite your legs off!", "I fart in your general direction!", "Anyone in the mood for a farcical aquatic ceremony?", "Go and boil your bottoms, you sons of silly persons!", "She turned me into a newt!", "Your mother was a hamster and your father smelt of elderberries!", "Go away before I taunt you a second time!", "What is the average airspeed velocity of an unlaiden swallow?", "Where'd you get the coconuts?!"];

    $(".taunt-bubble").hide();

    // var music = new Audio("../MidnightPianoBar.mp3")
    var music = new Audio("../TakeFive.mp3");
    // var music = new Audio("../KindOfBlue.mp3")
    music.volume = 0.38;


    // ----------------------- //
    // ---- ALL FUNCTIONS ---- //
    // ----------------------- //

    function createPlayerSlots()
    {
        var player_hands = document.getElementById("player_hands");
        player_hands.innerHTML = "";
        for(let player = 0; player < GameMaster.players.length; player ++)
        {
            player_hands.innerHTML += (`

            <!-- START OF ONE HAND -->

            <div class="hand hand${player}">
            <div class="tl-arrow"></div>
            <div class="tr-arrow"></div>
            <div class="bl-arrow"></div>
            <div class="br-arrow"></div>
            <div class="row">
                <div class="col-10">
                    <div class="row">
                        <div class="col-12">
                            <div class="row hand-labels">
                                <div class="col-12 col-md-6">
                                    <h3 class="player_name">${GameMaster.players[player].name}</h3>
                                </div>
                                <div class="col-12 col-md-6">

                                    <div class="chip-box" id="chip_box${player}"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12" class="">
                            <div class="row HandTarget${player}">
                            <!-- HERE IS WHERE THE HAND GOES -->
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-2 hand-buttons">
                    <div class="row">
                        <div class="col-6">
                            <i class="fas fa-hand-rock"></i>
                        </div>
                        <div class="col-6">
                            <div class="turn-indicator" id="turn_indicator${player}">
                                <i class="fas fa-child"></i>
                            </div>
                        </div>
                        <div id="buttons${player}"></div>
                    </div>
                </div>
            </div>
        </div>

        <!-- END OF HAND  -->
            `)
        }
        var chipBox = document.getElementById("chip_box");
        for(let i = 0; i < GameMaster.players.length; i ++)
        {
            console.log("inside chip distribution");

            for(let c = 0; c < GameMaster.players[i].chips; c++)
            {
                console.log("inside player chip");
                $("#chip_box" + i).append(
                `
                    <div class="chip"></div>
                `)
            }
        }

        for(let i = 0; i < GameMaster.players.length; i ++)
        {
            for(card in GameMaster.players[i].hand)
            {
                $(".HandTarget" + i).append(
                `   <div class="player-card cardNumber${card}">
                        <div class="card-anchor">
                            <div class="">
                                <img alt="WHY" id="player_card${i}${card}" class="clickable">
                                <input type="hidden" class="value" value="${card}">
                            </div>
                            <!-- a card should go here -->
                        </div>
                    </div>
                `)
                if(GameMaster.players[i].isHuman && GameMaster.players[i].player_seat == GameMaster.turn)
                {
                    document.getElementById("player_card" + i + card).setAttribute("src", "https://secure-bastion-71077.herokuapp.com/img/" + GameMaster.players[i].hand[card]["suit"][0] + GameMaster.players[i].hand[card]["face"] )
                }
                else
                {
                    document.getElementById("player_card" + i + card).setAttribute("src", "https://secure-bastion-71077.herokuapp.com/img/cardback" )
                }
            }
        }
    }

    function manGreen()
    {   
        $(".turn-indicator").removeClass("man-green");
        $("#turn_indicator" + GameMaster.turn).addClass("man-green");
    }

    function drawControls()
    {
        manGreen();
        for(let i = 0; i < GameMaster.players.length; i ++)
        {
            if(GameMaster.players[i].isHuman == true && GameMaster.players[i].player_seat == GameMaster.turn)
            {
                console.log("It's human!!")
                $("#buttons" + i).append(
                    `<div class="row">
                        <div class="col-12">
                            <!-- feel free to put these inside forms if easier/required. Make sure the form is instantiated inside of the col-12 -->
                            <!-- discard card button -->
                            <button class="discard-btn">Discard</button>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <!-- laydown button -->
                            <button class ="knock-btn">Knock</button>
                            <!-- knock button -->
                            <!-- <button class="hide">Lay Down!</button> -->
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <!-- Show Assist button -->
                            <button class="assist-btn">Assist</button>
                        </div>
                    </div>`)
            }
            else if($("#buttons" + i).html().length)
            {
                $("#buttons" + i).empty();
            }
        }
    }

    function fillTaunt(bubble)
    {
        switch(GameMaster.taunts)
            {
                case "shakespeare":
                    $(bubble).append(Shakespearian[Math.floor(Math.random() * Shakespearian.length)]);
                    break;
                case "mp":
                    $(bubble).append(MontyPython[Math.floor(Math.random() * MontyPython.length)]);
                    break;
                case "tt":
                    $(bubble).append(TrashTalk[Math.floor(Math.random() * TrashTalk.length)]);
                    break;
            }
    }

    function ComputerTaunt()
    {
        if(GameMaster.taunts != "off")
        {

            if(Math.floor(Math.random() * 4) + 1 == 4)
            {
                if($("#taunt-text").html().length)
                {
                    var bubble2 = $("#taunt-text-extra")
                    fillTaunt(bubble2)
                    $("#taunt-bubble-extra").fadeIn(500);
                    $("#taunt-bubble-extra").position({
                        my: "left",
                        at: "right+20",
                        of: ".hand" + GameMaster.turn
                    });
                    setTimeout(function(){
                        $("#taunt-bubble-extra").fadeOut(800)
                    }, 3000);
                    setTimeout(function(){
                        $("#taunt-text-extra").empty()
                    }, 4000)
                }
                else
                {
                    var bubble = $("#taunt-text")
                    fillTaunt(bubble)
                    $("#taunt-bubble").fadeIn(500);
                    $("#taunt-bubble").position({
                        my: "left",
                        at: "right+15",
                        of: ".hand" + GameMaster.turn
                    });
                    setTimeout(function(){
                        $("#taunt-bubble").fadeOut(800)
                    }, 3000);
                    setTimeout(function(){
                        $("#taunt-text").empty()
                    }, 4000)
                }
            }
        }
    }

    function ErrorBubble(message)
    {
        $("#error-text").empty();
        $("#error-text").append(message);

        $("#error").fadeIn(500);
            $("#error").position({
                my: "left",
                at: "right+20",
                of: ".hand" + GameMaster.turn
            });
            setTimeout(function(){
                $("#error").fadeOut(800)
            }, 3000);

    }

    function replacePlayerHands()
    {
        for(var idx = 0; idx < GameMaster.players.length; idx++)
        {
            $(".HandTarget" + idx).empty();
            for(card in GameMaster.players[idx].hand)
            {
                $(".HandTarget" + idx).append(
                    `   <div class="player-card cardNumber${card}">
                            <div class="card-anchor">
                                <div class="">
                                    <img alt="WHY" id="player_card${idx}${card}" class="clickable">
                                    <input type="hidden" class="value" value="${card}">
                                </div>
                                <!-- a card should go here -->
                            </div>
                        </div>
                    `)
                if((GameMaster.players[idx].isHuman && (GameMaster.players[idx].player_seat == GameMaster.turn || GameMaster.singlePlayer)) || GameMaster.endRound != null || GameMaster.allAI == true)
                {
                    document.getElementById("player_card" + idx + card).setAttribute("src", "https://secure-bastion-71077.herokuapp.com/img/" + GameMaster.players[idx].hand[card]["suit"][0] + GameMaster.players[idx].hand[card]["face"] )
                }
                else
                {
                    document.getElementById("player_card" + idx + card).setAttribute("src", "https://secure-bastion-71077.herokuapp.com/img/cardback" )
                }
            }
        }
    }

    function hidePlayerHands()
    {
        for(var idx = 0; idx < GameMaster.players.length; idx++)
        {
            $(".HandTarget" + idx).empty();
            for(card in GameMaster.players[idx].hand)
            {
                $(".HandTarget" + idx).append(
                    `   <div class="player-card cardNumber${card}">
                            <div class="card-anchor">
                                <div class="">
                                    <img alt="WHY" id="player_card${idx}${card}" class="clickable">
                                    <input type="hidden" class="value" value="${card}">
                                </div>
                                <!-- a card should go here -->
                            </div>
                        </div>
                    `)
                document.getElementById("player_card" + idx + card).setAttribute("src", "https://secure-bastion-71077.herokuapp.com/img/cardback" )
            }
        }
    }

    function ShowDiscardPile()
    {
        if(GameMaster.deck.discardPile.length > 0)
        {
            document.getElementById("discard_pile_top_card").setAttribute("src", "https://secure-bastion-71077.herokuapp.com/img/" + GameMaster.deck.discardPile[0]["suit"][0] + GameMaster.deck.discardPile[0]["face"] )
        }
        else
        {
            document.getElementById("discard_pile_top_card").setAttribute("src", "https://secure-bastion-71077.herokuapp.com/img/transparent1")
        }
    }
    function HumanTurnChange(nextplayerName)
    {
        document.getElementById("change_turn").innerHTML = "";
        $("#change_turn").append(`
        <div class="inner-shadow">
            <div class="bubble-border shadow-bubble">
                <div class="row">
                    <div class="col-12">
                        <h2 class="tac">${nextplayerName}'s turn is next:</h2>
                        <p>Click "Ready!" to show your cards and begin your turn.</p>
                        <div class="row">
                            <div class="col-12 clearfix">
                                <button class="float-right" id="shadowbox_confirm">Ready!</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`)
        $("#change_turn").toggle();
        $("#change_turn_shadow_box").toggle();
    }

    function HumanTurnStart(nextplayerName)
    {
        document.getElementById("change_turn").innerHTML = "";
        $("#change_turn").append(`
        <div class="inner-shadow">
            <div class="bubble-border shadow-bubble">
                <div class="row">
                    <div class="col-12">
                        <h2 class="tac">${nextplayerName}'s turn is next:</h2>
                        <p>Click "Ready!" to show your cards and begin your turn.</p>
                        <div class="row">
                            <div class="col-12 clearfix">
                                <button class="float-right" id="shadowbox_close">Ready!</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`)
        $("#change_turn").toggle();
        $("#change_turn_shadow_box").toggle();
    }

    function EndRoundResults()
    {
        var cardDict = {
            "1" : "A",
            "2" : "2",
            "3" : "3",
            "4" : "4",
            "5" : "5",
            "6" : "6",
            "7" : "7",
            "8" : "8",
            "9" : "9",
            "10" : "10",
            "11" : "J",
            "12" : "Q",
            "13" : "K"
        }
        var suitDict = {
            "spades" : "♤",
            "clubs" : "♧",
            "hearts" : "♡",
            "diamonds" : "♢",
        }

        var htmlResults = ""
        for(var idx = 0; idx < GameMaster.players.length; idx++)
        {
            var handString = ""
            for(var i = 0; i < GameMaster.players[idx].hand.length; i++)
            {
                handString += `${cardDict[GameMaster.players[idx].hand[i].face]}${suitDict[GameMaster.players[idx].hand[i].suit]} `
            }
            htmlResults += `<div class="row">
                                <div class="col-3">
                                    <p>${GameMaster.players[idx].name}</p>
                                </div>
                                <div class="col-3">
                                    <p>${GameMaster.players[idx].hand_value} points</p>
                                </div>
                                <div class="col-4">
                                    <p>[ ${handString}]</p>
                                </div>
                                <div class="col-2">
                                    <p>${GameMaster.players[idx].loser}</p>
                                </div>
                            </div>`
        }

        document.getElementById("change_turn").innerHTML = "";
        $("#change_turn").append(`
        <div class="inner-shadow">
            <div class="bubble-border shadow-bubble">
                <div class="row">
                    <div class="col-12">
                        <h2 class="tac">${GameMaster.endRound.winner.name} won the round!</h2>
                            ${htmlResults}
                        <div class="row">
                            <div class="col-12 clearfix">
                                <button class="m0a float-right" id="shadowbox_end_round">Next Round</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`)
        $("#change_turn").toggle();
        $("#change_turn_shadow_box").toggle();
    }

    function CallNextRound()
    {
        $.ajax({
            type: "POST",
            data: {"GM" :JSON.stringify(GameMaster)},
            url: "/NextRound",
            dataType: "json",
            success: function(res)
            {
                console.log(res);
                GameMaster = res;
                if(!GameMaster.endGame)
                {
                    ShowDiscardPile()
                    createPlayerSlots();
                    drawControls();
                    if(!GameMaster.players[GameMaster.turn].isHuman)
                    {
                        CompDraw();
                    }
                    else if(GameMaster.players[GameMaster.turn].isHuman && !GameMaster.singlePlayer)
                    {
                        hidePlayerHands();
                        HumanTurnStart(GameMaster.players[GameMaster.turn].name);
                    }
                }
                else
                {
                    EndGame();
                }
            }
        })
    }

    function EndGame()
    {
        document.getElementById("change_turn").innerHTML = "";
        $("#change_turn").append(`
        <div class="inner-shadow">
            <div class="bubble-border shadow-bubble">
                <div class="row">
                    <div class="col-12">
                        <h2 class="tac">${GameMaster.players[0].name} won the game!</h2>
                        <h4>Would you like to play again?</h4>
                        <button id="PlayGame"></button>
                        <div class="row">
                            <div class="col-12 clearfix">
                                <button class="m0a float-right" id="Home">Return to Home Screen</button>
                            </div>
                        </div>
                        // <button id="Home">Return to Home Screen</button>
                    </div>
                </div>
            </div>
        </div>`)
        $("#change_turn").toggle();
        $("#change_turn_shadow_box").toggle();
    }

    function NextTurn()
    {
        $.ajax({
            type: "POST",
            data: {"GM" :JSON.stringify(GameMaster)},
            url: "/NextTurn",
            dataType: "json",
            success: function(res){
                console.log(res);
                GameMaster = res;
                replacePlayerHands();
                drawControls();
                if(GameMaster.endRound != null)
                {
                    replacePlayerHands();
                    EndRoundResults();
                }
                else if(!GameMaster.players[GameMaster.turn].isHuman)
                {
                    CompDraw();
                }
            }
        })
    }

    function CompDraw()
    {
        var player = GameMaster.turn;
        $.ajax({
            type: "POST",
            data: {"GM" :JSON.stringify(GameMaster)},
            url: "/ComputerTurnDraw",
            dataType: "json",
            success: function(res){
                console.log(res);
                GameMaster = res;
                ShowDiscardPile();
                replacePlayerHands();
                CompDiscard();
            }
        })
    }

    function CompDiscard()
    {
        var player = GameMaster.turn;
        var nextplayer = player+1;
        if(nextplayer == GameMaster.players.length)
        {
            nextplayer = 0;
        }
        $.ajax({
            type: "POST",
            data: {"GM" :JSON.stringify(GameMaster)},
            url: "/ComputerTurnDiscard",
            dataType: "json",
            success: function(res){
                console.log(res);
                GameMaster = res;
                ShowDiscardPile();
                replacePlayerHands();
                ComputerTaunt()
                if(GameMaster.players[player].knocked)
                {
                    new Audio("../Knocking2.mp3").play();
                    // alert(GameMaster.players[player].name + " has just knocked! ruh roh!")
                }
                if(GameMaster.endRound != null)
                {
                    replacePlayerHands();
                    EndRoundResults();
                }
                else if((GameMaster.players[nextplayer].isHuman && !GameMaster.players[nextplayer].knocked) && !GameMaster.singlePlayer)
                {
                    HumanTurnChange(GameMaster.players[nextplayer].name);
                }
                else
                {
                    NextTurn();
                }
            }
        })
    }

    function PlayMusic()
    {
        music.play();
    }

    function PauseMusic()
    {
        music.pause();
    }

    // ------------------------ //
    // ------ AJAX STUFF ------ //
    // ------------------------ //

    // Initialize Game
    $("#PlayGame").click(function()
    {
        $("#game_rules").toggle();
        $("#game_rules_shadow_box").toggle();

        $.get("/start",function(res)
        {
            GameMaster = res;
            console.log(GameMaster);
            ShowDiscardPile()
            createPlayerSlots();
            drawControls();
            if(!GameMaster.players[GameMaster.turn].isHuman)
            {
                CompDraw();
            }
            else if(GameMaster.players[GameMaster.turn].isHuman && !GameMaster.singlePlayer)
            {
                hidePlayerHands();
                HumanTurnStart(GameMaster.players[GameMaster.turn].name);
                console.log("Reached end of else-if")
            }
        });
    })

    $("#Home").click(function()
    {
        // $("#game_rules").toggle();
        // $("#game_rules_shadow_box").toggle();
    })

    $(document).on("click", "#Close_Rules", function(){
        $("#game_rules").toggle();
        $("#game_rules_shadow_box").toggle();
        $.get("/start",function(res)
        {
            GameMaster = res;
            console.log(GameMaster);
            ShowDiscardPile()
            createPlayerSlots();
            drawControls();
            if(!GameMaster.players[GameMaster.turn].isHuman)
            {
                CompDraw();
            }
            else if(GameMaster.players[GameMaster.turn].isHuman && !GameMaster.singlePlayer)
            {
                hidePlayerHands();
                HumanTurnStart(GameMaster.players[GameMaster.turn].name);
            }
        });
    })

    // hide menu rules
    $("#big_close_menu_rules").click(function(){
        $("#menu_rules").toggle();
        $("#menu_rules_shadow_box").toggle();
    })
    // hide menu rules
    $("#close_menu_rules").click(function(){
        $("#menu_rules").toggle();
        $("#menu_rules_shadow_box").toggle();
    })


    // Next human player ready
    $(document).on("click", "#shadowbox_confirm", function()
    {
        $("#change_turn").toggle();
        $("#change_turn_shadow_box").toggle();
        NextTurn();
    })

    // Next Round
    $(document).on("click", "#shadowbox_end_round", function(){
        $("#change_turn").toggle();
        $("#change_turn_shadow_box").toggle();
        CallNextRound();
    })

    // hide shadowbox
    $(document).on("click", "#shadowbox_close", function(){
        $("#change_turn").toggle();
        $("#change_turn_shadow_box").toggle();
        replacePlayerHands();
    })

    //--------------------------//
    //--nav menu functionality--//
    //--------------------------//

    $("#show_rules_menu").click(function(){
        $("#menu_rules").toggle();
        $("#menu_rules_shadow_box").toggle();
    })

    $("#music").mouseenter(function(){
        $(".music").show();
        $("#music").addClass("active");
    })

    $(".music").mouseleave(function(){
        $(".music").fadeOut(100);
    })

    $("#game-speed").mouseenter(function(){
        $(".game-speed").show();
    })

    $(".game-speed").mouseleave(function(){
        $(".game-speed").fadeOut(100);
    })

    $("#taunt").mouseenter(function(){
        $(".taunt").show();
    })

    $(".taunt").mouseleave(function(){
        $(".taunt").fadeOut(100);
    })

    $("#music-on").click(function(){
        PlayMusic();
    })

    $("#music-off").click(function(){
        PauseMusic();
    })

    $(".music").click(function(){
        $(".music").attr("style", "display: none");
    })

    $("#speed-slow").click(function(){
        GameMaster.gameSpeed = 3;
    })

    $("#speed-normal").click(function(){
        GameMaster.gameSpeed = 2;
    })

    $("#speed-fast").click(function(){
        GameMaster.gameSpeed = 1;
    })

    $(".game-speed").click(function(){
        $(".game-speed").attr("style", "display: none");
    })

    $("#taunt-off").click(function(){
        GameMaster.taunts = "off";
    })

    $("#taunt-shakespeare").click(function(){
        GameMaster.taunts = "shakespeare";
    })

    $("#taunt-mp").click(function(){
        GameMaster.taunts = "mp";
    })

    $("#taunt-tt").click(function(){
        GameMaster.taunts = "tt";
    })

    $(".taunt").click(function(){
        $(".taunt").attr("style", "display: none");
    })

    //---------------------------------//
    //---- End of nav jquery stuff ----//
    //---------------------------------//

    // Select a Card
    $(document).on("click", ".clickable", function()
    {
        if(GameMaster.players[GameMaster.turn].isHuman)
        {
            if($(this).parents('.HandTarget' + GameMaster.turn).length)
            {
                if($(this).hasClass("player-selected"))
                {
                    $(this).toggleClass("player-selected");
                }
                else
                {
                    $(".hand").find(".player-selected").removeClass("player-selected");
                    $(this).toggleClass("player-selected");
                }
            }
        }
    });

    // Help Player
    $(document).on("click", ".assist-btn", function()
    {
        var player = GameMaster.turn;
        if(GameMaster.players[player].isHuman)
        {
            $(".hand").find(".player-selected").removeClass("player-selected");

            {
                $.ajax({
                    type: "POST",
                    data: {"GM" :JSON.stringify(GameMaster)},
                    url: "/AssistPlayer",
                    dataType: "json",
                    success: function(res)

                    {
                        console.log(res);
                        GameMaster = res;
                        replacePlayerHands();
                        if(GameMaster.players[player].hand.length == 4)
                        for(var i = 0; i < GameMaster.players[player].hand.length; i++)
                        {
                            if(GameMaster.players[player].hand[i].selected == true)
                            {
                                $("#player_card"+player+i).addClass("player-selected")
                            }
                        }
                        else if(GameMaster.players[player].hand.length == 3)
                        {
                            if(GameMaster.players[player].hand_value > 27 && !GameMaster.discardEvaluation)
                            {
                                ErrorBubble(`Your hand value is ${GameMaster.players[player].hand_value}, try knocking`)
                            }
                            else if(GameMaster.players[player].hand_value > 27 && GameMaster.discardEvaluation)
                            {
                                ErrorBubble("Your hand is strong; either knock or take the card in the discard pile for a stronger hand")
                            }
                            else if(GameMaster.discardEvaluation)
                            {
                                ErrorBubble("The card in the discard pile would help your current hand")
                            }
                            else
                            {
                                ErrorBubble("You should probably draw from the deck")
                            }
                        }
                    }
                })
            }
            // else
            // {
            //     ErrorBubble("Please draw a card first.")
            // }
        }
    })

    // Human Draw Deck
    $("#DrawCard").on("click", function()
    {
        var player = GameMaster.turn
        if(GameMaster.endRound == null && GameMaster.players[player].isHuman)
        {

            if(GameMaster.players[player].hand.length == 3)
            {
                $.ajax({
                    type: "POST",
                    data: {"GM" :JSON.stringify(GameMaster)},
                    url: "/DrawDeck",
                    dataType: "json",
                    success: function(res)
                    {
                        console.log(res);
                        GameMaster = res;
                        replacePlayerHands();
                    }
                })
            }
            else
            {
                ErrorBubble("You may only draw once per turn.");
            }
        }
        else
        {
            ErrorBubble("You cannot draw at this time.");
        }
    });

    // Human Draw From Discard
    $("#DiscardCard").on("click", function(){
        if((GameMaster.players[GameMaster.turn].hand.length == 3 && GameMaster.endRound == null) && GameMaster.players[GameMaster.turn].isHuman)
        {
            $.ajax({
                type: "POST",
                data: {"GM" :JSON.stringify(GameMaster)},
                url: "/DrawDiscard",
                dataType: "json",
                success: function(res){
                    console.log(res);
                    GameMaster = res;
                    ShowDiscardPile();
                    replacePlayerHands();
                }
            })
        }
        else
        {
            ErrorBubble("You may only draw once per turn.")
        }
    });

    // Human Discard a Card
    $(document).on("click", ".discard-btn", function()
    {
        var player = GameMaster.turn;
        var nextplayer = GameMaster.turn+1;
        var counter = 0;
        if(nextplayer == GameMaster.players.length)
        {
            nextplayer = 0;
        }
        if($(this).parents('.hand' + player).length)
        {
            if(GameMaster.players[player].hand.length == 4)
            {
                //flag that card with a selected property
                for(let i = 0; i < GameMaster.players[player].hand.length; i ++)
                {
                    isSelected = $(".cardNumber" + i).find(".player-selected");
                    if(isSelected.length)
                    {
                        GameMaster.players[player].hand[i].selected = true
                        $.ajax({
                            type: "POST",
                            data: {"GM" :JSON.stringify(GameMaster)},
                            url: "/DiscardCard",
                            dataType: "json",
                            success: function(res){
                                console.log(res);
                                GameMaster = res;
                                ShowDiscardPile();
                                hidePlayerHands();
                                if(GameMaster.players[player].knocked)
                                {
                                    new Audio("../Knocking.mp3").play();
                                    // alert(GameMaster.players[player].name + " has just knocked! ruh roh!")
                                }
                                if((GameMaster.players[nextplayer].isHuman && !GameMaster.players[nextplayer].knocked) && !GameMaster.singlePlayer)
                                {
                                    HumanTurnChange(GameMaster.players[nextplayer].name);
                                }
                                else
                                {
                                    NextTurn();
                                }
                            }
                        }) // end of discard ajax
                    }
                    else
                    {
                        counter++
                        if(counter == GameMaster.players[player].hand.length)
                        {
                            ErrorBubble("Plese choose a discard or click assist for suggested discard.")
                        }
                    }
                }
            }
            else
            {
                ErrorBubble("Please draw a card first.")
                return;
            }
        }
        return;
    });


    // Human Knock
    $(document).on("click", ".knock-btn", function()
    {
        var player = GameMaster.turn;
        var nextplayer = GameMaster.turn+1;
        if(nextplayer == GameMaster.players.length)
        {
            nextplayer = 0;
        }
        if(GameMaster.players[player].hand.length == 3 && !GameMaster.knocked)
        {
            // change gamemaster and current player status to knocked
            GameMaster.players[player].knocked = true;
            GameMaster.knocked = true;
            new Audio("../Knocking2.mp3").play();
            //---------------------------------//
            //--- Insert Knock Notification ---//
            //---------------------------------//
            if(!GameMaster.players[nextplayer].isHuman)
            {
                NextTurn();
            }
            else
            {
                hidePlayerHands();
                // next player is human, and they haven't knocked, and it is not in single player mode --> call next human turn prompt
                if((GameMaster.players[nextplayer].isHuman && !GameMaster.players[nextplayer].knocked) && !GameMaster.singlePlayer)
                {
                    HumanTurnChange(GameMaster.players[nextplayer].name);
                }
            }
        }
        else
        {
            ErrorBubble("You can only knock at the beginning of your turn.")
        }
    })

}) // document ready
