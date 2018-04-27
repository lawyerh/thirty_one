using System;
using System.Collections.Generic;

namespace _31_by_3
{
    public class Deck : BaseEntity
    {
        public const int DeckSize = 52;
        public List<Card> deck;
        public List<Card> DiscardPile = new List<Card>();

        public Deck()
        {

        }

        public List<Card> NewDeck()
        {
            deck = new List<Card>();
            string[] faces = {"2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "1"};
            string[] suits = {"hearts", "clubs", "spades", "diamonds"};
            int[] values = {2,3,4,5,6,7,8,9,10,10,10,10,11};
            for(int cardNum = 0; cardNum < DeckSize; cardNum++)
            {
                deck.Add(new Card(faces[cardNum % 13], suits[cardNum / 13], values[cardNum % 13]));
            }
            return deck;
        }
        public List<Card> Shuffle(List<Card> deck)
        {
            for (int first = 0; first < deck.Count; first++)
            {
                Random ranNum = new Random();
                int second = ranNum.Next(deck.Count);
                Card temp = deck[first];
                deck[first] = deck[second];
                deck[second] = temp;
            }
            return deck;
        }
        public void ReShuffle(Deck deck, List<Card> discard)
        {
            foreach(var card in discard)
                {
                    deck.deck.Add(card);
                }
                discard.Clear();
                deck.Shuffle(deck.deck);
                deck.MoveTopCardToDiscardPile();
        }
        
        public void MoveTopCardToDiscardPile()
        {
            if(deck.Count > 0)
            {
                DiscardPile.Add(deck[0]);
                deck.RemoveAt(0);
            }
        }
        public void DrawFromDeck(Player player)
        {
            if (deck.Count > 0)
            {
                player.hand.Add(deck[0]);
                deck.RemoveAt(0);
            }
            else
            {
                // put dicard pile into "deck" and shuffle
                deck = Shuffle(DiscardPile);
                DiscardPile.Clear();
                MoveTopCardToDiscardPile();
            }
        }
        public void DrawFromDiscard(Player player)
        {
            player.hand.Add(DiscardPile[0]);
            DiscardPile.RemoveAt(0);
        }
    }
}