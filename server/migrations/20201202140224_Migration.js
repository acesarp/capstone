const Knex = require('knex');
/**
 * 
 * @param {Knex} knex 
 */
exports.up = function (knex) {
    return knex.schema
        .dropTableIfExists("reactions")
        .dropTableIfExists("comments")
        .dropTableIfExists("events")
        .dropTableIfExists("activities")
        .dropTableIfExists("users")

        .createTable("users", table => {
            table.increments("userId").primary();          
            table.string("username", 20).notNullable();
            table.string("password", 20).notNullable();
            table.string("firstName", 30).notNullable();
            table.string("lastName", 30).notNullable();
            table.date("dob").notNullable();
            table.string("phone", 15);
            table.string("email", 30).notNullable();
            table.string("street", 60).notNullable();
            table.string("city", 30).notNullable();
            table.string("province-state", 30).notNullable();
            table.string("country", 30).notNullable();    
            // table.integer("User_userId").unsigned().references("userId")
            //     .inTable("Users")
            //     .onUpdate("CASCADE")
            //     .onDelete("CASCADE");
            
            table.string("userFolderPath");
            table.string("displayName");
            table.date("displayBirthday");
            table.string("about", 600);
            table.string("gender", 15);
            table.string("avatar");
            table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now());
            table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now());
    })
        
        .createTable("activities", table => {
            table.increments("activityId").primary();

            table.string("description", 400).notNullable();
            table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now());
            table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now());
        })

        .createTable("events", table => {
            table.increments("eventId").primary();

            table.string("name").notNullable();
            table.string("address").notNullable();
            table.string("description").notNullable();

            // table.integer("Activity_activityId").unsigned().references("activityId")
            //     .inTable("activities")
            //     .onUpdate("CASCADE")
            //     .onDelete("CASCADE");

            table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now());
            table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now());
        })
        
        .createTable("comments", (table) => {
            table.increments("commentId").primary();
            
            // table.integer("ownerId").unsigned().references("userId");
            table.string("title").notNullable();
            table.string("text").notNullable();
            table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now());
            table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now());
        })
        .createTable("reactions", table => {
            table.increments("reactionId").primary();
            // table.integer("ownerId").unsigned()
            //     .references("userId")
            //     .inTable("users");
            
            // table.integer("comment_commentId").unsigned().notNullable().references("commentId")
            //     .inTable("Comments")
            //     .onUpdate("CASCADE")
            //     .onDelete("CASCADE");

            table.boolean("likeDislike").notNullable();

            table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now());
            table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now());
        })

        .createTable('events_users', (table) => {
            table.integer('eventId').unsigned().references('events.eventId');
            table.integer('userId').unsigned().references('users.userId');
        })
        .createTable('users_friends', (table) => {
            table.integer('owner_userId').unsigned().references('users.userId');
            table.integer('friendId').unsigned().references('users.userId');
        })
        ;
};


/**
 * 
 * @param {Knex} knex 
 */
exports.down = function (knex) {
    return knex.schema
        .dropTable("users")
        .dropTable("events")
        .dropTable("activities")
        .dropTable("comments")
        .dropTable("reactions")
};