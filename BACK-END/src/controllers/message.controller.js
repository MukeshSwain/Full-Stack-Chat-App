import Message from "../../models/message.model.js";
import User from "../../models/user.model.js";
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.io.js";
//import { io } from "../lib/socket.io.js";


export const getUsersForSidebar =async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const users = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
        
        res.status(200).json(users)
    } catch (error) {
        console.log("Error in getUsersForSidebar controller", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const sendMessage = async (req, res) => {
   
    try {
        const { id: receiverId } = req.params;
        const {text,image} = req.body;
        const myId = req.user._id;
        if (!text && !image) {
            return res.status(400).json({ message: "Text or image is required to send message" })
        }
        let imageUrl;
        if (image) {
            const response = await cloudinary.uploader.upload(image);
            imageUrl = response.secure_url
        }
        const newMessage = new Message({
            senderId: myId,
            receiverId,
            text,
            image:imageUrl
        })
        if (newMessage) {
            await newMessage.save();
            //Todo /.....
            const receiverSocketId = getReceiverSocketId(receiverId);
            if (receiverSocketId) { 
                io.to(receiverSocketId).emit("newMessage", newMessage)
            }
            res.status(201).json(newMessage)
        } else {
            res.status(500).json({ message: "Error in sending message" })
        }
        
    } catch (error) {
        console.log("Error in sendMessage controller", error.message);
    }
}

export const getMessages = async (req, res) => { 
    try {
        const { id: receiverId } = req.params;
        const myId = req.user._id;
        const messages = await Message.find({ $or: [{ senderId: myId, receiverId: receiverId }, { senderId: receiverId, receiverId: myId }] })
        if (!messages) {
            return res.status(404).json({ message: "No messages found" })
        }
        res.status(200).json(messages)
    } catch (error) {
        console.log("Error in getMessages controller", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}