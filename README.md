# No Joke - Building a Dad joke Site with Stitch

## Want to hear a joke about construction? I'm still working on it.
There comes a point in every father's life, where it just clicks. Everything your father knew before you makes complete sense now, and the baton has been passed. That's right, you learn the art of the dad joke.  Subtle, and completely horrible humor told at inappropriate times like when the prom date arrives, or the waitress takes your order.

In this day and age, it's getting harder to recall such comedy genius.  So I set out to build myself a simple application to remind me of the witty wisecracks my kids have "groan" to love. My plan was simple, a very small react application, a single API route, and a database.  Instead of going through the work of creating the API myself, I instead turned to [Stitch](https://www.mongodb.com/cloud/stitch) from MongoDB.  Stitch will allow me to create a backend for my application quickly. Much like the shovel, it's a ground-breaking invention.


## Two goldfish are in a tank. One says to the other, "do you know how to drive this thing?"

First things first, you need a MongoDB Atlas account. You can find the tutorial to set one up [here](https://docs.atlas.mongodb.com/getting-started/). Don't worry about importing the data they provide, though, we will be making out own CSV to upload.

Once you are logged in and have a cluster created, you can create a Stitch app.

1. Click `Create New Application`
1. Name the application - I called mine "dadjokes"
1. Pick your cluster, and click `Create`

Once that is completed, the getting started screen has most of the options we need.

1. **Initialize a MongoDB Collection**: The database can be `dadjokes`, and the collection `jokes`
1. Click `Add A Service` which will take you to the Services page
1. Click the `Add A Service` button in the upper right, and then select `HTTP`.
1. Name the service `dadjokes` and click `Add Service`
1. Next, click `Add Incoming Webhook`
1. Name it `jokes`
1. Turn on `Respond With Result` so we get a payload back from the webhook
1. Change the method to `GET`
1. Select `Require Secret As Query Param` for `Request Validation`
1. Create a `Secret`. This can be a GUID or a string of your choosing. I made mine `poof_youre_a_sandwich`. For more info on how to use this go [here](https://docs.mongodb.com/stitch/reference/partner-services/http/#example-secret-query-parameter)
1. Click the `Save` button

At this point, you have created a REST route in Stitch. Now it only needs to do something.

## Why do you never see elephants hiding in trees? Because they’re so good at it!

Now that the route is created, we want to get data out of our database. "But wait!", I hear you cry. "We have no data!".  You are absolutely correct.  Let's fix that right now.

1. Create a new file somewhere, and call it `dadjokes.csv`
1. The first line is the header, use the word `joke`
1. Find your favorite dad jokes, and on each line after the first, add one joke. You probably need to wrap them in quotes because of commas in the joke itself. Fix any quotes in the joke itself as well.
1. Follow [this tutorial](https://docs.atlas.mongodb.com/import/mongoimport/) to import the CSV file. Make sure to add `--type csv` to import the CSV file properly.

When done correctly, you should see this -

```
2018-06-12T23:57:04.815-0400	connected to: localhost
2018-06-12T23:57:04.929-0400	imported 10 documents
```

Now that you have data in the collection, returning a random joke from the route by connecting to the `mongodb-atlas` service.

1. If you aren't there already, go back to the `jokes` webhook and click on `Function Editor.`
1. Add the following code to return one random joke:

```js
exports = function(payload) {
    var mongodb = context.services.get("mongodb-atlas");
    var coll = mongodb.db("dadjokes").collection("jokes");
    var cursor = coll.aggregate([
      { $sample: { size: 1 } }
    ]);
    return cursor.next();
};
```

The `$sample` operation for `aggregate` will randomly select a document from the collection. You read about that more [here](https://docs.mongodb.com/manual/reference/operator/aggregation/sample/).

Now, you can copy the webhook, and add the query parameter `secret=<YOUR SECRET>` to test out the route. The data should look something like this:

```json
{
  "_id": {
    "$oid": "5b2096101f867510b0fd2a98"
  },
  "joke": "Want to hear a joke about a piece of paper? Never mind... it's tearable."
}
```

All that's left now is to grab the front end source code, and get things running.

## What’s orange and sounds like a parrot? A carrot!

You can find the React project on [Github](https://github.com/kellyjandrews/dadjokes).

1. Download the zip file, and open `index.js`
1. Find `const baseUrl` on line 5.
1. Replace this line with your webhook url and secret.
1. Either `npm install` and `npm start` or `docker-compose up` to run the application
1. Open `locahost:3000` and enjoy!

You can see an example here - http://www.kellyjandrews.com/dadjokes/


## How does a penguin build its house? Igloos it together!

Just like the penguin, using Stitch allows me to glue some things together. Database, REST routes, and React apps are all just a few clicks away.  We don't have to know all of the security details of implementing server side code, just create an application in Stitch and configure away.  This introduction just scratches the surface, but the site has several tutorials to help you learn more. Also, I would avoid the sushi if I was you. It's a little fishy.
