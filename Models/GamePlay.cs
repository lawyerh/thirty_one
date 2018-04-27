using System.Collections.Generic;
using System.Linq;

namespace _31_by_3
{
    public static class GamePlay
    {
        public static int SizeOfHand = 3;
        public static int Pot { get; set; }

        public static Deck BuildAndShuffle()
        {
            Deck CurrentDeck = new Deck();
            CurrentDeck.deck = CurrentDeck.NewDeck();
            CurrentDeck.deck = CurrentDeck.Shuffle(CurrentDeck.deck);
            CurrentDeck.DiscardPile.Clear();
            return CurrentDeck;
        }
            
        public static void Deal(List<Player> players, Deck deck)
        {
            //Deal 3 cards to each player (staggered dealing)
            for(var i = 0; i < SizeOfHand; i++)
            {
                foreach(Player player in players)
                {
                    deck.DrawFromDeck(player);
                }
            }
            foreach(Player person in players)
            {
                HandValue.SortHand(person);
            }
            deck.MoveTopCardToDiscardPile();
        }
        public static List<Player> CreatePlayers(List<string> PlayerSelect)
        {
            // generate human players in game
            var Players = new List<Player>();

            foreach(var player in PlayerSelect)
            {
                if(player=="zxc")
                {
                    Players.Add(new Player(name: player, isHuman: false));
                }
                else
                {
                    Players.Add(new Player(name: player));
                }
            }
            if(Players.Count > 3)
            {
                Players[Players.Count - 2].name = Player.CreateRandomEarthName();
                Players[Players.Count - 1].name = Player.CreateRandomFunnyName();
            }
            
            // Place players at table
            for(var i = 0; i < Players.Count; i++)
            {
                Players[i].player_seat = i;
            }

            return Players;
        }
    }
}