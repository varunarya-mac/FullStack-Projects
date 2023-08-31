import mongoose from 'mongoose';
import { Password } from '../services/password';

// An interface that describes the properties
interface UserAttr {
    email: string;
    password: string;
}

// interface that describes the properties that a User Model has
interface UserModel extends mongoose.Model<UserDoc> {
    build(attr: UserAttr): UserDoc;
}

// interface that describes the properties that a User Document has
interface UserDoc extends mongoose.Document {
    email: string;
    password: string;
}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
    },
}, {
    toJSON: {
        // it is a function that run when we try to send the user object as a response. alter the object as per our need
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.password;
        },
        // it remove the __v property from the object
        versionKey: false,
    }
});

userSchema.pre('save', async function (done) {
    if (this.isModified('password')) {
        const hashed = await Password.toHash(this.get('password')!);
        this.set('password', hashed);
    }
        done();
});

userSchema.statics.build = (attr: UserAttr) => {
    return new User(attr);
}

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);


export { User };