const Knex = require('knex');
/**
 * 
 * @param {Knex} knex 
 */
exports.up = function (knex) {
    return knex.schema.createTable("users", table => {
        table.increments("userId").unsigned().unique().primary();
        table.string("username", 20).notNullable();

        table.date("dob").notNullable();
        table.integer("phone", 10).notNullable().unsigned();
        table.string("email", 30).notNullable();
        table.string("street", 60).notNullable();
        table.string("city", 30).notNullable();
        table.string("state-province", 30).notNullable();
        table.string("country", 30).notNullable();
        
        table.json("hash").notNullable();

        table.timestamp("createdAt").notNullable();
        table.timestamp("updatedAt").defaultTo(knex.fn.now());
    })
        // Profiles table
        .createTable("profiles", table => {
            table.increments("profileId").primary();

            table.integer("User_userId").notNullable().unsigned().unique().references("userId");
            
            table.foreign("Event_eventId", "eventId");
            table.foreign("Friend_friendId", "friendId");

            table.string("profilePicturePath");
            table.string("displayName");
            table.string("displayBirthday");

            table.timestamp("createdAt").notNullable();
            table.timestamp("updatedAt").defaultTo(knex.fn.now());
        })

        .createTable("events", table => {
            table.increments("eventId").primary();
            table.foreign("Profile_profileId", "profileId");

            table.string("name").notNullable();
            table.string("address").notNullable();
            table.string("description").notNullable();

            table.integer("Participant_participantId").references("participantId")
                .inTable("participants")
                .onUpdate("CASCADE")
                .onDelete("CASCADE");

            table.integer("Activity_activityId").references("activityId")
                .inTable("activities")
                .onUpdate("CASCADE")
                .onDelete("CASCADE");

            table.timestamp("createdAt").notNullable();
            table.timestamp("updatedAt").defaultTo(knex.fn.now());
        })
        .createTable("participants", table => {
            table.increments("participantId").primary();

            table.integer("Event_eventId").notNullable().references("eventId")
                .inTable("events")
                .onUpdate("CASCADE")
                .onDelete("CASCADE");

            table.string("address").notNullable();
            table.string("description").notNullable();

            table.timestamp("createdAt").defaultTo(knex.fn.now());
            table.timestamp("updatedAt").defaultTo(knex.fn.now());
        })

        .createTable("activities", table => {
            table.increments("activityId").primary();
            table.foreign("Event_eventId", "eventId");

            table.string("description", 400).notNullable();

            table.timestamp("createdAt").notNullable();
            table.timestamp("updatedAt").defaultTo(knex.fn.now());
        })
        
        .createTable("friends", table => {
            table.increments("friendId").primary();

            table.integer("Profiles_profileId").unsigned().unique().references("profileId")
                .inTable("profiles")
                .onUpdate("CASCADE")
                .onDelete("CASCADE");

            table.string("name").notNullable();
            table.string("dob");
            table.string("phone");
            table.string("email").notNullable();

            table.timestamp("createdAt").notNullable();
            table.timestamp("updatedAt").defaultTo(knex.fn.now());
        });
};


/**
 * 
 * @param {Knex} knex 
 */
exports.down = function (knex) {
    return knex.schema.dropTable("users")
        .dropTable("profiles")
        .dropTable("events")
        .dropTable("activities")
        .dropTable("participants")
        .dropTable("friend");
};