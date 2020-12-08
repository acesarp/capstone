
exports.seed = function(knex) {
          return knex('users').insert([
            {
              //userId: 0001,
              userName: "userName",
              password: "dorwssap",
              firstName: "Allen",
              lastName: "Gulph",
              dob: "1971-05-03",
              about: "Similar to migrations, the knex module allows us to create scripts to insert initial data into our tables called seed files! If we have relations on our tables, the seeding must be in a specific order to so that we can rely on data that might already be in the database. For example, we must seed the users table first because our tasks table must validate a user id foreign key that already exists.",
              email: 'alll@email.com',
              phone: "(155)555-5515",
              gender: "male",
              avatar: "",
              street: "Fake st",
              city: "Vancouver",
              'province-state': "BC",
              country: "Canada"
            },
            {
              //userId: 0002,
              userName: "dotNam51",
              password: "dorwssap",
              firstName: "Ronald",
              lastName: "Biggs",
              dob: "1951-05-03",
              about: "Similar to migrations, the knex module allows us to create scripts to insert initial data into our tables called seed files! If we have relations on our tables, the seeding must be in a specific order to so that we can rely on data that might already be in the database. For example, we must seed the users table first because our tasks table must validate a user id foreign key that already exists.",
              email: 'robg@email.com',
              phone: "(111)555-5055",
              gender: "male",
              avatar: "",
              street: "Fake st",
              city: "Vancouver",
              'province-state': "BC",
              country: "Canada"
            },

            {
              //profileId: 0003,
              userName: "aaaName",
              password: "dorwssap",
              firstName: "Beth",
              lastName: "Gulph",
              dob: "1970-01-03",
              about: "We must seed the users table first because our tasks table must validate a user id foreign key that already exists.",
              email: 'beth@email.com',
              phone: "(055)535-5555",
              gender: "Female",
              avatar: "",
              street: "Fake st",
              city: "Vancouver",
              'province-state': "BC",
              country: "Canada"
            }

          ]);
    };
    

