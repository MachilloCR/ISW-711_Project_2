import { newModel } from "../models/new.model.js";

// get news
export const getNews = async function (user_id) {
  //get all news
  try {
    const news = await newModel.find({user_id: user_id});
    if (news) {
      return news;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}
export const filterNewsByWord = async function (word , user_id) {
  //get news that containt the word provided
  try {
    const news = await newModel.find({$or:[{ short_description: { $regex: '.*' + word + '.*' }},{title: { $regex: '.*' + word + '.*' }}],$and:[{user_id: user_id}]})
    if (news) {
      return news;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}
export const filterNewsByCategory = async function (category_id , user_id) {
  //get news match whit the category id provided
  try {
    const news = await newModel.find({ category_id: category_id, user_id: user_id})
    if (news) {
      return news;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}