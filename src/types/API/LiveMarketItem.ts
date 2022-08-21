/**
 * {
        "id": "flame-grenade-2",
        "gameCode": "101011",
        "name": "Flame Grenade",
        "image": "https://www.lostarkmarket.online/assets/item_icons/flame-grenade.webp",
        "avgPrice": 9.9,
        "lowPrice": 11,
        "recentPrice": 11,
        "cheapestRemaining": 318,
        "amount": 1,
        "rarity": 2,
        "category": "Combat Supplies",
        "subcategory": "Battle Item - Offense",
        "shortHistoric": {
            "2022-08-19": 9.44,
            "2022-08-20": 10,
            "2022-08-14": 13.33,
            "2022-08-15": 12.48,
            "2022-08-18": 10.98,
            "2022-08-17": 17.08,
            "2022-08-16": 18.98
        },
        "updatedAt": "2022-08-20T11:14:43.204Z"
    },
 */
export type LiveMarketItem = {
  id: string;
  gameCode: string;
  name: string;
  image: string;
  avgPrice: number;
  lowPrice: number;
  recentPrice: number;
  cheapestRemaining: number;
  amount: number;
  rarity: number;
  category: string;
  subcategory: string;
  shortHistoric: Record<string, number>;
  updatedAt: Date;
};
