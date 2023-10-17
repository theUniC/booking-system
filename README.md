# Booking System

## Problem Statement

We want to make a booking solution for one hotel. The first 2 user stories are:

* As a user I want to see all free rooms.
* As a user I want to book a room.

The Booking struct contains

* client id
* room name
* arrival date
* departure date

And the Room struct contain only

* room name

## Proposed solution

In order to face a scalable solution I used tactical DDD with CQRS on top of Hexagonal Architecture. For that there're 3 main folders 👇

* `src/application` 👉 Contains all the top level services divided into commands, queries and events.
* `src/domainmodel` 👉 Contains all the business logic. For business logic I considered all the elements that change application state. In this case, the bookings. So this leaves all the reads out of the domainlayer and this also implies queries & query handlers.
* `src/infrastructure` 👉 Implementation details such as persistence.

As for the delivery mechanism, I used NestJs as framework of choice given it's maturity and all the built-in features it comes with. Features used 👇

* Delivery Mechanism 👉 NestJs
* Persistence layer 👉 TypeORM
* CQRS framework 👉 NestJs CQRS

## How to run the project

For this you will need to have Docker installed. Then run

    docker compose up -d

Once everything is running, just point your browser to

**_https://127.0.0.1:3000/api_**