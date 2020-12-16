export default class ClientModel {

    /**
     * 
     * @param {string} userId 
     * @param {string} userName
     * @param {string} password
     * @param {string} firstName
     * @param {string} lastName
     * @param {Date} dob
     * @param {string} about
     * @param {string} email
     * @param {string} phone
     * @param {string} gender
     * @param {string} avatarFileName
     * @param {Object} avatarBlob
     * @param {Object} address
     * @param {Object} friends
     */
    constructor(userId, userName, password, firstName, lastName, dob, about, email, phone, gender, avatarFileName, avatarBlob, address, friends) {

        this.userId = userId;
        this.userName = userName;
        this.password = password
        this.firstName = firstName;
        this.lastName = lastName;
        this.dob = dob;
        this.about = about;
        this.email = email;
        this.phone = phone;
        this.gender = gender;
        this.avatarFileName = avatarFileName;
        this.avatarBlob = avatarBlob;
        this.address = address;
        this.friends = friends;
    };

    stringify() {
        return JSON.stringify({
            userId: this.userId,
            userName: this.userName,
            password: this.password,
            firstName: this.firstName,
            lastName: this.lastName,
            dob: this.dob,
            about: this.about,
            email: this.email,
            phone: this.phone,
            gender: this.gender,
            avatarFileName: this.avatarFileName,
            avatarBlob: this.avatarBlob,
            address: this.address,
            friends: this.friends
        });
    }

    toJSON() {
        return {
            userId: this.userId,
            userName: this.userName,
            password: this.password,
            firstName: this.firstName,
            lastName: this.lastName,
            dob: this.dob,
            about: this.about,
            email: this.email,
            phone: this.phone,
            gender: this.gender,
            avatarFileName: this.avatarFileName,
            avatarBlob: this.avatarBlob,
            address: this.address,
            friends: this.friends
        };
    }
}

