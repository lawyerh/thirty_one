using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using _31_by_3.Models;


namespace _31_by_3.Controllers
{
    public class HumanController : Controller
    {
        [HttpGet]
        [Route("start")]
        public JsonResult StartGame()
        {   
            List<string> PlayerSelect = new List<string>();
            int? PlayerCount = HttpContext.Session.GetInt32("PlayerCount");
            for(int idx = 1; idx <= (int)PlayerCount; idx++)
            {
                switch(idx)
                {
                    case 1:
                        string player1 = HttpContext.Session.GetString("player1");
                        PlayerSelect.Add(player1);
                        break;
                    case 2:
                        string player2 = HttpContext.Session.GetString("player2");
                        PlayerSelect.Add(player2);
                        break;
                    case 3:
                        string player3 = HttpContext.Session.GetString("player3");
                        PlayerSelect.Add(player3);
                        break;
                    case 4:
                        string player4 = HttpContext.Session.GetString("player4");
                        PlayerSelect.Add(player4);
                        break;
                    case 5:
                        string player5 = HttpContext.Session.GetString("player5");
                        PlayerSelect.Add(player5);
                        break;
                    case 6:
                        string player6 = HttpContext.Session.GetString("player6");
                        PlayerSelect.Add(player6);
                        break;

                }
            }
            GameMaster GameMaster = new GameMaster(PlayerSelect);
            return Json(GameMaster);
        }
    
        [HttpPost]
        [RequestSizeLimit(valueCountLimit: 1000000000)]
        [Route("NextRound")]
        public JsonResult NextRound(string GM)
        {
            GameMaster PreviousGame = JsonConvert.DeserializeObject<GameMaster>(GM);
            GameMaster GameMaster = new GameMaster(PreviousGame);
            if(GameMaster.players.Count == 1)
            {
                GameMaster.endGame = true;
            }
            return Json(GameMaster);
        }

        [HttpPost]
        [RequestSizeLimit(valueCountLimit: 1000000000)]
        [Route("NextTurn")]
        public JsonResult NextTurn(string GM)
        {
            GameMaster GameMaster = JsonConvert.DeserializeObject<GameMaster>(GM);
            HandValue.SortHand(GameMaster.players[GameMaster.turn]);
            GameMaster.turn++;
            if (GameMaster.turn == GameMaster.players.Count)
            {
                GameMaster.turn = 0;
            }
            if(GameMaster.players[GameMaster.turn].knocked == true)
            {
                GameOver endRound = new GameOver(GameMaster);
                GameMaster.endRound = endRound;
            }
            return Json(GameMaster);
        }


        [HttpPost]
        [RequestSizeLimit(valueCountLimit: 1000000000)]
        [Route("DrawDeck")]
        public JsonResult DrawDeck(string GM)
        {
            GameMaster GameMaster = JsonConvert.DeserializeObject<GameMaster>(GM);
            GameMaster.players[GameMaster.turn].hand.Add(GameMaster.deck.deck[0]);
            GameMaster.deck.deck.RemoveAt(0);

            return Json(GameMaster);
        }

        [HttpPost]
        [RequestSizeLimit(valueCountLimit: 1000000000)]
        [Route("DrawDiscard")]
        public JsonResult DrawDiscard(string GM)
        {
            GameMaster GameMaster = JsonConvert.DeserializeObject<GameMaster>(GM);
            Player player = GameMaster.players[GameMaster.turn];
            player.hand.Add(GameMaster.deck.DiscardPile[0]);
            GameMaster.deck.DiscardPile.RemoveAt(0);

            return Json(GameMaster);
        }

        [HttpPost]
        [RequestSizeLimit(valueCountLimit: 1000000000)]
        [Route("DiscardCard")]
        public JsonResult DiscardCard(string GM)
        {
            GameMaster GameMaster = JsonConvert.DeserializeObject<GameMaster>(GM);
            Player player = GameMaster.players[GameMaster.turn];
            for(int i = 0; i < player.hand.Count; i ++)
            {
                if(player.hand[i].selected)
                {  
                    player.hand[i].selected = false; // remove discard attribute
                    GameMaster.deck.DiscardPile.Insert(0, player.hand[i]);
                    player.hand.RemoveAt(i);
                }
            }
            player.hand_value = HandValue.Calculate(player);
            if(GameMaster.deck.deck.Count == 0)
            {
                GameOver endRound = new GameOver(GameMaster);
                GameMaster.endRound = endRound;
            }
            if(player.hand_value == 31 || player.hand_value == 32)
            {
                GameOver endRound = new GameOver(player, GameMaster);
                GameMaster.endRound = endRound;
            }
            return Json(GameMaster);
        }

        [HttpPost]
        [RequestSizeLimit(valueCountLimit: 1000000000)]
        [Route("AssistPlayer")]
        public JsonResult AssistPlayer(string GM)
        {
            GameMaster GameMaster = JsonConvert.DeserializeObject<GameMaster>(GM);
            Player player = GameMaster.players[GameMaster.turn];
            HandValue.SortHand(player);
            AI cardHelper = new AI(player);
            if(cardHelper.hand.Count == 4)
            {
                Card min = cardHelper.ChooseDiscard(cardHelper);

                for(int idx = 0; idx < player.hand.Count; idx++)
                {
                    if(player.hand[idx] == min)
                    {
                        Card temp = player.hand[idx];
                        player.hand[idx] = player.hand[player.hand.Count - 1];
                        player.hand[player.hand.Count - 1] = temp;
                    }
                }
                HandValue.PartialSort(player.hand, 2);
                player.hand[player.hand.Count -1].selected = true;
            }
            else if(cardHelper.hand.Count == 3)
            {
                if(cardHelper.EvaluateDiscardCard(cardHelper, GameMaster.deck.DiscardPile[0], GameMaster))
                {
                    GameMaster.DiscardEvaluation = true;
                }
                else
                {
                    GameMaster.DiscardEvaluation = false;
                }
            }

            return Json(GameMaster);
        }
    }
}