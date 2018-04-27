using System;
using System.Collections.Generic;
using System.Linq;

namespace _31_by_3
{
    public class GameOver
    {
        public Player Winner = new Player();
        public List<Player> TieScores = new List<Player>();
        public bool callTieBreaker = false;
        public int HighestRankingCard;
        public int Pot { get; set; }

        public GameOver()
        {
            
        }

        public GameOver(GameMaster gameMaster)
        {
            // set highest hand to winner
            foreach(Player player in gameMaster.players)
            {
                player.loser = "";
                if(player.hand_value > Winner.hand_value)
                {
                    this.Winner = player;
                }
            }
            foreach(Player player in gameMaster.players)
            {
                if(player.hand_value == Winner.hand_value)
                {
                    TieScores.Add(player);
                }
            }
            if(TieScores.Count > 1)
            {   
                HighestRankingCard = 0;
                Dictionary<string, int> suitRanking = new Dictionary<string, int>();
                suitRanking.Add("spades", 3);
                suitRanking.Add("hearts", 2);
                suitRanking.Add("clubs", 1);
                suitRanking.Add("diamonds", 0);
                
                string HighestRankingSuit = "";
                foreach(Player player in TieScores)
                {
                    AI TieBreaker = new AI(player);
                    foreach(Card c in TieBreaker.hand)
                    {
                        if(c.suit == TieBreaker.best_suit)
                        {
                            int sum = 0;
                            int face = Int32.Parse(c.face);
                            if(face == 1)
                            {
                                face = 14;
                            }
                            sum += face;
                            if(sum > HighestRankingCard)
                            {
                                HighestRankingSuit = TieBreaker.best_suit;
                                HighestRankingCard = sum;
                                this.Winner = player;
                            }
                            else if(sum == HighestRankingCard)
                            {
                                if(suitRanking[HighestRankingSuit] < suitRanking[TieBreaker.best_suit])
                                {
                                    this.Winner = player;
                                }
                            }
                        }
                    }
                } 
                
            }

            // check if winner is knocker
            if(!Winner.knocked)
            {
                foreach(Player player in gameMaster.players)
                {
                    if(player.knocked)
                    {
                        player.chips--;
                        player.loser = "-1 chip";
                    }
                }
            }
            else
            {
                Player Loser = gameMaster.players[0];
                foreach(Player player in gameMaster.players)
                {
                if(player.hand_value < Loser.hand_value) // double check with tie logic
                    {
                        Loser = player;
                    }
                }
                Loser.loser = "-1 chip";
                Loser.chips--;
            }
        }
        public GameOver(Player winner, GameMaster gameMaster)
        {
            this.Winner = winner;

            foreach(Player player in gameMaster.players)
            {
                player.loser = "";
                if(player != this.Winner)
                {
                    player.chips--;
                    player.loser = "-1 chip";
                    Pot++;
                }
            }
        }        
    }
}