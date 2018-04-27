using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using _31_by_3.Models;

namespace _31_by_3.Controllers
{
    public class CardsController : Controller
    {
        [HttpGet]
        [Route("")]
        public IActionResult PlayerSelect()
        {
            return View();
        }

        [HttpPost]
        [Route("players")]
        public IActionResult Players(string player1, string player2, string player3, string player4, string player5, string player6, int PlayerCounter)
        {
            HttpContext.Session.SetInt32("PlayerCount", PlayerCounter);
            for(int idx = 1; idx <= PlayerCounter; idx++)
            {
                switch(idx)
                {
                    case 1:
                        if(player1 == null)
                        {
                            player1 = "zxc";
                        }
                        HttpContext.Session.SetString("player1", player1);
                        break;
                    case 2:
                        if(player2 == null)
                        {
                            player2 = "zxc";
                        }
                        HttpContext.Session.SetString("player2", player2);
                        break;
                    case 3:
                        if(player3 == null)
                        {
                            player3 = "zxc";
                        }
                        HttpContext.Session.SetString("player3", player3);
                        break;
                    case 4:
                        if(player4 == null)
                        {
                            player4 = "zxc";
                        }
                        HttpContext.Session.SetString("player4", player4);
                        break;
                    case 5:
                        if(player5 == null)
                        {
                            player5 = "zxc";
                        }
                        HttpContext.Session.SetString("player5", player5);
                        break;
                    case 6:
                        if(player6 == null)
                        {
                            player6 = "zxc";
                        }
                        HttpContext.Session.SetString("player6", player6);
                        break;
                        

                }
            }
            return RedirectToAction("Main");
        }

        [HttpGet]
        [Route("main")]
        public IActionResult Main()
        {
            ViewBag.please = "~";
            return View();
        }
    }
}
