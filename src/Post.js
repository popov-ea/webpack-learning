export class Post {
    constructor(title, logo) {
        this.title = title;
        this.date = new Date();
        this.logo = logo;
    }
    
    toString() {
        return JSON.stringify({
            title: this.title,
            logo: this.logo,
            date: this.date.toJSON()
        });
    }
}