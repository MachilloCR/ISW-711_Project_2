import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const newSchema = new Schema({
    title: { type: String },
    short_description: { type: String },
    permalink: { type: String },
    date: { type: String },
    news_source_id: { type: String },
    category_id: { type: String },
    user_id: { type: String },
    imagen: { type: String }
});

export const newModel = mongoose.model('News', newSchema);
