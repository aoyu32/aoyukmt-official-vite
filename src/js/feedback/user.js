export class User {
    constructor(username, avatar) {
        this.username = username || '';
        this.avatar = avatar || '';
    }

    setUsername(username) {
        this.username = username;
    }

    getUsername() {
        return this.username;
    }

    setAvatar(avatar) {
        this.avatar = avatar;
    }

    getAvatar() {
        return this.avatar;
    }
}