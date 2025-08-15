
Server start     
    npm start

  The server will start on http://localhost:3000.

  1. SET a key-value pair:
   curl -X POST -H "Content-Type: application/json" -d '{"key":"mykey", "value":"Hello Redis!"}' http://localhost:3000/set

  2. GET the value of a key:
   curl http://localhost:3000/get/mykey

  3. DELETE a key:
   curl -X DELETE http://localhost:3000/del/mykey


Ranking 
1. Add users and scores to a leaderboard:

  Let's create a leaderboard called "game-scores".

curl -X POST -H "Content-Type: application/json" -d '{"key":"game-scores", "score":100, "member":"player-one"}' http://localhost:3000/zadd
curl -X POST -H "Content-Type: application/json" -d '{"key":"game-scores", "score":250, "member":"player-two"}' http://localhost:3000/zadd
curl -X POST -H "Content-Type: application/json" -d '{"key":"game-scores", "score":50, "member":"player-three"}' http://localhost:3000/zadd
curl -X POST -H "Content-Type: application/json" -d '{"key":"game-scores", "score":500, "member":"player-four"}' http://localhost:3000/zadd


2. Get the top 3 players (highest scores):

  We use zrevrange to get scores in descending order. The 0 and 2 mean we want the top 3 players (from index 0 to 2).
   curl http://localhost:3000/zrevrange/game-scores/0/2

  This will return an array with the players and their scores, like: ["player-four","500","player-two","250","player-one","100"]

3. Get the bottom 3 players (lowest scores):
  We use zrange to get scores in ascending order.

  curl http://localhost:3000/zrange/game-scores/0/2

  This will return the players with the lowest scores: ["player-three","50","player-one","100","player-two","250"]

4. Get a specific player's score:
   curl http://localhost:3000/zscore/game-scores/player-two

  This will return: {"member":"player-two","score":"250"}
