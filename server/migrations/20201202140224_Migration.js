const Knex = require('knex');
/**
 * 
 * @param {Knex} knex 
 */
exports.up = function (knex) {
    return knex.schema
        
        .createTable("users", table => {
        table.increments("userId").primary();
        table.string("username", 20).notNullable();
        table.date("dob").notNullable();
        table.integer("phone", 10).notNullable().unsigned();
        table.string("email", 30).notNullable();
        table.string("street", 60).notNullable();
        table.string("city", 30).notNullable();
        table.string("province-state", 30).notNullable();
        table.string("country", 30).notNullable();
        table.timestamp("createdAt").notNullable();
        table.timestamp("updatedAt").defaultTo(knex.fn.now());
        })
        
        .createTable("activities", table => {
            table.increments("activityId").primary();

            table.string("description", 400).notNullable();
            table.timestamp("createdAt").notNullable();
            table.timestamp("updatedAt").defaultTo(knex.fn.now());
        })
        // Profiles table
    .createTable("profiles", table => {
        table.increments("profileId").primary();

        table.integer("User_userId").unsigned().references("userId");

        table.string("profilePicturePath");
        table.string("displayName");
        table.string("displayBirthday");

        table.timestamp("createdAt").notNullable();
        table.timestamp("updatedAt").defaultTo(knex.fn.now());
    })

        .createTable("events", table => {
            table.increments("eventId").primary();

            table.string("name").notNullable();
            table.string("address").notNullable();
            table.string("description").notNullable();

            // table.integer("Participant_participantId").references("participantId")
            //     .inTable("participants")
            //     .onUpdate("CASCADE")
            //     .onDelete("CASCADE");

            table.integer("Activity_activityId").unsigned().references("activityId")
                .inTable("activities")
                .onUpdate("CASCADE")
                .onDelete("CASCADE");

            table.timestamp("createdAt").notNullable();
            table.timestamp("updatedAt").defaultTo(knex.fn.now());
        })
        // .createTable("participants", table => {
        //     table.increments("participantId").primary();

        //     table.integer("Event_eventId").notNullable().references("eventId")
        //         .inTable("events")
        //         .onUpdate("CASCADE")
        //         .onDelete("CASCADE");

        //     table.string("address").notNullable();
        //     table.string("description").notNullable();

        //     table.timestamp("createdAt").defaultTo(knex.fn.now());
        //     table.timestamp("updatedAt").defaultTo(knex.fn.now());
        // })
        
        // .createTable("friends", table => {
        //     table.increments("friendId").primary();

        //     table.string("name").notNullable();
        //     table.string("dob");
        //     table.string("phone");
        //     table.string("email").notNullable();

        //     table.timestamp("createdAt").notNullable();
        //     table.timestamp("updatedAt").defaultTo(knex.fn.now());
        // })

        .createTable('events_profiles', function (table) {
            table.integer('eventId').unsigned().references('events.eventId');
            table.integer('profileId').unsigned().references('profiles.profileId');
        })
        .createTable('profiles_profiles', function (table) {
            table.integer('owner_profileId').unsigned().references('profiles.profileId');
            table.integer('friendId').unsigned().references('profiles.profileId');
        })
        ;
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