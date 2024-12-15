import { nanoid } from "nanoid";
import userModel from "../ṃodels/userModel.js";
import  'dotenv/config'

const port = process.env.PORT;

export async function getUrl(req, res) {
  try {
    const id = req.params.shortUrl;

    const urlObj = await userModel.findOne({ shortUrl: id });

    if (urlObj) {
      res.redirect(urlObj.Originalurl);
    } else {
      res.status(404).json({ message: "Shortened URL not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
}

export async function newUrl(req, res) {
  try {
    const url = req.body.url;
    console.log(url);
    
    const id = nanoid(5);

    const isUrlExists = await userModel.findOne({ Originalurl: url });

    if (isUrlExists) {
      res.json({
        message: "URL already exists",
        link: `https://urlshortner-td2x.onrender.com/${isUrlExists.shortUrl}`,
      });
    } else {
      const urlObj = await new userModel({
        Originalurl: url,
        shortUrl: id,
      }).save();

      res.status(200).json({
        message: "Shortened link is generated",
        link: `https://urlshortner-td2x.onrender.com/${id}`,
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
}

export async function getData(req, res) {
    try {
      const data = await userModel.find();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error });
    }
  }
