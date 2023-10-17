# Lazy Resy

I'm hungry and like to eat well. What can I say? 🤷‍♂️

This script allows you to make a reservation at a restaurant on Resy. It's ideally run on a cron job, but can be run
manually as well. Imagine picking your day and ideal time, and then letting the script do the rest. It's that easy. No
more wait-lists, no more checking the app every 5 minutes. Just set it and forget it.

## Motivation

One day, [Highlands Bar & Grill](https://highlandsbarandgrill.com/) will reopen. And when it does, I want to be there. I
want to be there so bad that I wrote this script to make a reservation for me. Goddammit, I want that
[cornbread](https://thelocalpalate.com/recipes/highlands-cornbread/).

## Installation

Clone the repository:

```bash
git clone https://github.com/robertjdominguez/ez-resy.git
```

Install the dependencies:

```bash
npm i
```

## Configuration

You'll need a `.env` file that contains the following:

```env
VENUE_ID=
DATE=
EARLIEST=
LATEST=
PARTY_SIZE=
PAYMENT_ID=
AUTH_TOKEN=
```

| Variable     | Description                                                            |
| ------------ | ---------------------------------------------------------------------- |
| `VENUE_ID`   | Resy's venue ID.                                                       |
| `DATE`       | The `YYYY-MM-DD` format for the meal you want to stuff your face with. |
| `EARLIEST`   | The earliest time, in 24-hr format, you're willing to eat.             |
| `LATEST`     | Same as above: how late is too late to sit down?                       |
| `PARTY_SIZE` | 🎵 All by myself... 🎵 (it's an `int`)                                 |
| `PAYMENT_ID` | You'll need this from your account. More details below.                |
| `AUTH_TOKEN` | Same as above — just a JWT you can easily find.                        |

### Venue ID

This is the ID of the restaurant you want to eat at. You can find this by going to the Network tab in your browser's
inspector and searching for `venue?filter` after navigating to the restaurant's page.

### Payment ID

You'll need to find your payment ID. This is a little tricky, but not too bad. Again, in the Network tab, find the
request that's made after you authenticate. You can search for `user` in the requests and find the one that has your
user information. `payment_method` is in there as an object and has a field of `id`. That's what you want.

### Auth Token

This is easier to find. You can head to Application > Cookies > https://resy.com and find the `authToken` cookie. This
does expire after a while, so you'll need to update it every so often.

## Usage

After adding your configuration, you can run the script with:

```bash
npm run start
```

This will trigger a bash file called `env_manager.sh` that will set the date in the `.env` to two weeks from now (when
most restaurants start opening up reservations) and then run the script. However, you can modify it to run on the `.env`
as is by setting the date manually and then running:

```bash
npm run start:today
```
