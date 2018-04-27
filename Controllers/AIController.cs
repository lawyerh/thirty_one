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
    public class AIController : Controller
    {
        [HttpPost]
        [RequestSizeLimit(valueCountLimit: 1000000000)]
        [Route("ComputerTurnDraw")]
        public JsonResult ComputerTurnDraw(string GM)
        {
            GameMaster GameMaster = JsonConvert.DeserializeObject<GameMaster>(GM);
            Player player = GameMaster.players[GameMaster.turn];

            if(player.hand_value > 27 && GameMaster.knocked == false)
            {
                player.knocked = true;
                GameMaster.knocked = true;
            }
            else
            {
                AI Computer = new AI(player);
                if(Computer.EvaluateDiscardCard(Computer, GameMaster.deck.DiscardPile[0], GameMaster))
                {
                    GameMaster.deck.DrawFromDiscard(Computer);
                }
                else
                {
                    GameMaster.deck.DrawFromDeck(Computer);
                }
            }

            return Json(GameMaster);
        }

        [HttpPost]
        [Route("ComputerTurnDiscard")]
        public JsonResult ComputerTurnDiscard(string GM)
        {

            GameMaster GameMaster = JsonConvert.DeserializeObject<GameMaster>(GM);

            Random random = new Random();
            System.Threading.Thread.Sleep((random.Next(750, 1650) * GameMaster.gameSpeed));

            Player player = GameMaster.players[GameMaster.turn];
            
            if(player.hand.Count == 4)
            {
                AI Computer = new AI(player);
                Card min = Computer.ChooseDiscard(Computer);
                
                GameMaster.deck.DiscardPile.Insert(0, min);
                player.hand.Remove(min);
                player.hand_value = HandValue.Calculate(player);
            }

            if(player.hand_value == 31 || player.hand_value == 32)
            {
                GameOver endRound = new GameOver(player, GameMaster);
                GameMaster.endRound = endRound;
            }

            return Json(GameMaster);
        }
    }
}