export default class ClientSignupModel {

    /**
     * 
     * @param {string} profileId 
     * @param {string} userName
     * @param {string} password
     * @param {string} firstName
     * @param {string} lastName
     * @param {Date} dob
     * @param {string} bio
     * @param {string} email
     * @param {string} phone
     * @param {string} gender
     * @param {string} avatar
     */
    constructor(profileId, userName, password, firstName, lastName, dob, bio, email, phone, gender, avatar, address) {

        this.profileId = profileId;
        this.userName = userName;
        this.password = password
        this.firstName = firstName;
        this.lastName = lastName;
        this.dob = dob;
        this.bio = bio;
        this.email = email;
        this.phone = phone;
        this.gender = gender;
        this.avatar = avatar;
        this.address = address;
    };

    stringify() {
        return JSON.stringify({
            profileId: this.profileId,
            userName: this.userName,
            password: this.password,
            firstName: this.firstName,
            lastName: this.lastName,
            dob: this.dob,
            bio: this.bio,
            email: this.email,
            phone: this.phone,
            gender: this.gender,
            avatar: this.avatar,
            address: this.address
        });
    }

    toJSON() {
        return {
            profileId: this.profileId,
            userName: this.userName,
            password: this.password,
            firstName: this.firstName,
            lastName: this.lastName,
            dob: this.dob,
            bio: this.bio,
            email: this.email,
            phone: this.phone,
            gender: this.gender,
            avatar: this.avatar,
            address: this.address
        };
    }
}

