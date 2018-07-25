### Introduction

The idea was to use zeit Micro to create a microservice that would serve news articles to authenticated users.

###### Goals achieved so far:

1.  Serve headlines as a JSON list to authenticated users **FROM PGSQL**.

2.  Users are authenticated based on an `userID` and `token`. The idea is to be be able to extend to OAuth seamlessly and hence using tokens. Both are sent as part of request headers.

3.  Migrations + Seeding script for initial data. Had to roll on my seeding script, newbie with PGSQL and got tangled up with apparently wrong migration library.

4.  Jest tests for the authentication module.

5.  Backend supports limited paging with 10 results per page.

###### Features that didn't make it

1.  SSL encryption

2.  User sign up API endpoint for getting new tokens. But this should be part of the Oauth service not this.

3.  Micro Proxy to serve based on API paths.

4.  Microservice for allowing insertion of new articles.

5.  Tests for headline fetcher.

6.  Proper ORM for the the code base, first thing on TODO list.
