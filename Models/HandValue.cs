using System;
using System.Collections.Generic;
using System.Linq;

namespace _31_by_3
{
    public class HandValue
    {
        public static List<Card> hearts = new List<Card>();
        public static List<Card> diamonds = new List<Card>();
        public static List<Card> spades = new List<Card>();
        public static List<Card> clubs = new List<Card>();
        public static List<Card> aces = new List<Card>();
        public static int[] num_suits = new int[4];
        public static int hand_value { get; set; }
        public static int hearts_value { get; set; }
        public static int clubs_value  {get; set; }
        public static int spades_value { get; set; }
        public static int diamonds_value { get; set; }
        public static int[] suit_values = new int[4];
    
        public HandValue()
        {

        }
        public static int Calculate(Player player)
        {
            hearts_value = 0;
            diamonds_value = 0;
            spades_value = 0;
            clubs_value = 0;
            
            hearts.Clear();
            diamonds.Clear();
            spades.Clear();
            clubs.Clear();
            aces.Clear();
            
            // build lists of each suit-type for each players hand
            for (var i = 0; i < player.hand.Count; i++)
            {
                if (player.hand[i].suit == "hearts")
                {
                    hearts.Add(player.hand[i]);
                    hearts_value += player.hand[i].value;
                }
                else if (player.hand[i].suit == "diamonds")
                {
                    diamonds.Add(player.hand[i]);
                    diamonds_value += player.hand[i].value;
                }
                else if (player.hand[i].suit == "spades")
                {
                    spades.Add(player.hand[i]);
                    spades_value += player.hand[i].value;                
                }
                else if (player.hand[i].suit == "clubs")
                {
                    clubs.Add(player.hand[i]);
                    clubs_value += player.hand[i].value;                
                }
            }
            // find highest value suit - set to hand value of player
            suit_values[0] = hearts_value;
            suit_values[1] = diamonds_value;
            suit_values[2] = spades_value;
            suit_values[3] = clubs_value; 
            hand_value = suit_values.Max();
            foreach(Card c in player.hand)
            {
                if(c.value == 11)
                {
                    aces.Add(c);
                }
            }
            if(aces.Count == 3)
            {
                hand_value = 32;
            }

            return hand_value;
        }

        public static void SortHand(Player player)
        {
            bool sorted = false;
            bool madeChanges = false;
            var runner = 0;
            while(!sorted)
            {
                if(runner == player.hand.Count-1)
                {
                    System.Console.WriteLine("if runner is at the end");
                    if(!madeChanges)
                    {
                        System.Console.WriteLine("if not made changes");
                        sorted = true;
                    }
                    else
                    {
                        madeChanges = false;
                        runner = 0;
                    }
                }
                else
                {
                    if(player.hand[runner].value < player.hand[runner + 1].value)
                    {
                        madeChanges = true;
                        var temp = player.hand[runner + 1];
                        player.hand[runner + 1] = player.hand[runner];
                        player.hand[runner] = temp;
                    }
                    if(player.hand[runner].value == player.hand[runner+1].value)
                    {
                        int face0 = Int32.Parse(player.hand[runner].face);
                        if(face0 == 1)
                        {
                            face0 = 14;
                        }
                        int face1 = Int32.Parse(player.hand[runner + 1].face);
                        if(face1 == 1)
                        {
                            face1 = 14;
                        }
                        if(face0 < face1)
                        {
                            var temp = player.hand[runner + 1];
                            player.hand[runner + 1] = player.hand[runner];
                            player.hand[runner] = temp;
                        }
                    }
                    runner++;
                }
            }
        }
        public static void PartialSort(List<Card> playerHand, int cardIdx)
        {
            bool sorted = false;
            bool madeChanges = false;
            var runner = 0;
            while(!sorted)
            {
                // stop the runner at the specified index of the hand
                if(runner == cardIdx)
                {
                    System.Console.WriteLine("if runner is at the end");
                    if(!madeChanges)
                    {
                        System.Console.WriteLine("if not made changes");
                        sorted = true;
                    }
                    else
                    {
                        madeChanges = false;
                        runner = 0;
                    }
                }
                else
                {
                    if(playerHand[runner].value < playerHand[runner + 1].value)
                    {
                        madeChanges = true;
                        var temp = playerHand[runner + 1];
                        playerHand[runner + 1] = playerHand[runner];
                        playerHand[runner] = temp;
                    }
                    if(playerHand[runner].value == playerHand[runner+1].value)
                    {
                        int face0 = Int32.Parse(playerHand[runner].face);
                        if(face0 == 1)
                        {
                            face0 = 14;
                        }
                        int face1 = Int32.Parse(playerHand[runner + 1].face);
                        if(face1 == 1)
                        {
                            face1 = 14;
                        }
                        if(face0 < face1)
                        {
                            var temp = playerHand[runner + 1];
                            playerHand[runner + 1] = playerHand[runner];
                            playerHand[runner] = temp;
                        }
                    }
                    runner++;
                }
            }
        }
    }
}