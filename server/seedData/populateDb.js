const faker = require('faker');
const { PrismaClient } = require('@prisma/client');
const usersArray = require('./mockData/usersMockData.json');
const prisma = new PrismaClient();

const populateUserTable = async () => {

    for (let i = 0; i < 20; ++i) {
        let user_ = usersArray.users[i];
        await prisma.user.create({
            data: {

                username: user_.login.username,
                password: user_.login.password,
                firstName: user_.name.first,
                lastName: user_.name.last,
                dob: user_.dob.date,
                phone: user_.phone,
                email: user_.email,
                street: Object.values(user_.location.street).reduce((r, value) => r.toString() + value.toString()).toString(),
                city: user_.location.city,
                province_state: user_.location.state,
                country: user_.location.country,
                userFolderPath: "",
                displayName: user_.login.username,
                displayBirthday: null,
                about: faker.lorem.paragraph(3),
                gender: user_.gender,
                avatar: user_.picture.thumbnail,
                picture_med: user_.picture.medium,
                picture_large: user_.picture.large,
                createdAt: user_.registered.date,
                updatedAt: user_.registered.date
            }
        });
    }
}

const populateCommentTable = async () => {
    for (let i = 0; i <= 10; ++i) {
        try {
            const user = (await prisma.user.findUnique({
                where: { userId: Math.floor(Math.random() * 200) }
            }));

            await prisma.comment.create({
                data: {
                    author: { connect: { userId: user.userId } },
                    title: faker.random.word(),
                    text: faker.lorem.paragraph(3)
                }
            });
        }
        catch (error) {
            //console.error("Error: ", error);
        }
    }
}

const populateEventTable = async () => {
    for (let i = 0; i <= 10; ++i) {
        try {

            const user = (await prisma.user.findUnique({
                where: { userId: Math.floor(Math.random() * 10) }
            }));
            //.catch(error => console.error(error));

            const comments = (await prisma.comment.findMany({
                where: { commentId: Math.floor(Math.random() * 10) },
                take: 5
            }));
            //.catch(error => console.error(error));
            
            const users = (await prisma.user.findMany({
                where: { userId: Math.floor(Math.random() * 10) },
                take: 5
            }));
            //.catch(error => console.error(error));

            //console.log("User =====> ", users[0]);
            //console.log("Comments =====> ", comments[0]);
            //console.log(user.userId, comments[0].commentId, users[0].userId);
            //if (user || comments || users) {
            await prisma.event.create({
                    data: {
                        owner: { connect: { userId: user.userId } },
                        name: faker.random.word(),
                        address: faker.address.streetAddress(true),
                        description: faker.lorem.paragraph(1),
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        comments: { connect: comments },
                        participants: { connect: users }
                    }
                })
                .then(event => console.log("event ", event.eventId))
                .catch(error => console.error("error: ", error));
                
            //}
        }
        catch(error) {
            console.error("populateEventTable(): ", error);
        }
    }
}


const populateReactionTable = async () => {
    for (let i = 0; i <= 15; ++i) {

        try {
            const user = await prisma.user.findUnique({
                where: { userId: Math.floor(Math.random() * 10) }
            });
            const comment = await prisma.comment.findUnique({
                where: { commentId: Math.floor(Math.random() * 10) }
            });
            //console.log("comment id: ", comment.commentId);
            await prisma.reaction.create({
                data: {
                    owner: { connect: { userId: user.userId } },
                    commentId: { connect: { commentId: comment.commentId } },
                    likeDislike: true
                }
            })
                .then(reaction => console.log("reaction ", reaction.reactionId));;
        }
        catch (error) {
            //console.error(error);
        }
    }
}
const populateActivityTable = async () => {
    for (let i = 0; i <= 10; ++i) {
        try {
            const ranId = Math.floor(Math.random()*30);
                //console.log(ranId);
            const event = await prisma.event.findFirst({
                where: { eventId: ranId }
            });
            //console.log("Event ====> ", event);

            await prisma.activity.create({
                data: {
                    title: faker.random.word(),      
                    description: faker.lorem.paragraph(1),
                    location: faker.address.streetAddress(true),
                    event: { connect: { eventId: event.eventId }}
                }
            })
            .then(activity => console.log("activity ", activity.activityId));
        }
        catch (error) {
            //console.error(error);
        }
    }
}


module.exports = { populateUserTable,
                    populateEventTable,
                    populateCommentTable,
                    populateReactionTable,
                    populateActivityTable
                }