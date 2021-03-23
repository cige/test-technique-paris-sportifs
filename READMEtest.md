# betclic-new-betting-platform

<p>Hello friend.</p>
<p>I started to code the new betting platform, but I had to leave quickly to travel the world. Sorry.</p>

![I'm currently in Pig Island !](https://media.giphy.com/media/HV6uVZWJDJ42c/giphy.gif)

**Can you please finish coding it ?**

## Tech Spec

There are 3 endpoints we need :
1. Place a Bet
2. Get my Bets
3. Close (Settle) a bet

> **User Bet model** :
>```
>{
>    "id": "BETREF1234567", # => bet_id
>    "status": 0, # 0 = OPEN, 1 = WIN, 2 = LOSE, 3 = CANCEL
>    "user_id": 654321,
>    "selection_id": 552703749, # => Example: a selection, is "PSG win the match" in a match PSG - OM,
>    "odd": 1.8,
>    "stake": 500 # in cents
>}
>```

### Place a bet 

| Method | Route | Params as query param |
| ------ | ----- | ------ |
| POST   | /api/v1/bet | selection_id, odd, stake |

### Get my bets

| Method | Route | Params as query param |
| ------ | ----- | ------ |
| GET   | /api/v1/bet | count  |

### Close (Settle) a bet

| Method | Route | Params as query param |
| ------ | ----- | ------ |
| PUT   | /api/v1/bet | selection_id, result (0,1,2,3)  |

## Tech structure 
This project uses [Serverless Framework](https://www.serverless.com)

## Test
```
yarn test
```

#### IDEA setup
Add the Jest Options `--runInBand` in order to run tests sequentially.

## Work in local
```
./local_start_dev.sh
```
You will see the different endpoints available in console output.