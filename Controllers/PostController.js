const PostModel = require("../Models/postModel");
const mongoose = require("mongoose");
const userModel = require("../Models/userModel");


// Creat new Post
exports.createPost = async (req, res) => {
  const newPost = new PostModel(req.body);

  try {
    await newPost.save();
    res.status(200).json(newPost);
  } catch (error) { 
    res.status(500).json(error);
  }
};



// Get a post

exports.getPost = async (req, res) => {
  const id = req.params.id;

  try {
    const post = await PostModel.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};

 // Get all post

exports.getPosts = async (req, res) => {
 

  try {
    const posts = await PostModel.find({isVisible:true});
    res.status(200).json(posts.sort((a, b) => {
          return b.createdAt - a.createdAt; //latest posts  will apear first
        })  )
  } catch (error) {
    res.status(500).json(error);
  }
};

// Update a post
exports.updatePost = async (req, res) => {
  const postId = req.params.id;
  const { userId } = req.body;

  try {
    const post = await PostModel.findById(postId);
    if (post.userId === userId) {
 //req.body.updatedAt = Date.now();
 // req.body.createdAt = post.createdAt; 
      await post.updateOne({ $set: req.body });
      
      res.status(200).json("Post Updated");
    } else {
      res.status(403).json("Action forbidden");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
//book Medecine 
exports.bookMed = async (req, res) => {
  const itemId = req.params.id;
  const { userId } = req.body;

  try {
    const post = await PostModel.findById(itemId);

    await post.updateOne({ $set: { taken: 1, userIdBook: userId } });

    res.status(200).json("Medecine Booked successfully");
  } catch (error) {
    res.status(500).json(error);
  }
};
//////--------------
exports.bookMed = async (req, res) => {
  const itemId = req.params.id;
  const { userId } = req.body;

  try {
    const post = await PostModel.findById(itemId);

    // Set taken status to 1 and userIdBook to userId
    await post.updateOne({
      $set: {
        taken: 1,
        userIdBook: userId,
        takenUntil: Date.now() + 24 * 60 * 60 * 1000,
      },
    });

    // Set taken status back to 0 after 10 seconds
    setTimeout(async () => {
      try {
        const updatedPost = await PostModel.findByIdAndUpdate(
          itemId,
          { taken: 0, userIdBook: null, takenUntil: null },
          { new: true }
        );
        console.log(`Book with ID ${itemId} marked as available.`);
      } catch (error) {
        console.error(
          `Error marking book with ID ${itemId} as available: ${error.message}`
        );
      }
    }, 24 * 60 * 60 * 1000); // 10 seconds in milliseconds

    res.status(200).json("Medicine booked successfully");
  } catch (error) {
    res.status(500).json(error);
  }
};
// exports.bookMed = async (req, res) => {
//   const itemId = req.params.id;
//   const { userId } = req.body;

//   try {
//     const post = await PostModel.findById(itemId);

//     // Set taken status to 1 and userIdBook to userId
//     await post.updateOne({
//       $set: {
//         taken: 1,
//         userIdBook: userId,
//         takenUntil: Date.now() + 24 * 60 * 60 * 1000,
//       },
//     });

//     // Delay setting taken status back to 0 for 24 hours
//     setTimeout(async () => {
//       try {
//         const updatedPost = await PostModel.findByIdAndUpdate(
//           itemId,
//           { taken: 0, userIdBook: null, takenUntil: null },
//           { new: true }
//         );
//         console.log(`Book with ID ${itemId} marked as available.`);
//       } catch (error) {
//         console.error(
//           `Error marking book with ID ${itemId} as available: ${error.message}`
//         );
//       }
//     }, 24 * 60 * 60 * 1000);

//     res.status(200).json("Medicine booked successfully");
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };
//unbook Medecine 
exports.unbookMed = async (req, res) => {
  const itemId = req.params.id;
  const { userId } = req.body;

  try {
    const post = await PostModel.findById(itemId);

    //await post.updateOne({ $set: { taken: 1, userIdBook: userId } });
await post.updateOne({
  $set: { taken: 0, takenUntil:null },
  $unset: { userIdBook: "" },
});

    res.status(200).json("Medecine UnBooked successfully");
  } catch (error) {
    res.status(500).json(error);
  }
};
// Delete a post
exports.deletePost = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body;

  try {
    const post = await PostModel.findById(id);
    if (post.userId === userId) {
      await post.updateOne({ $set: {"isVisible":false} });
      res.status(200).json("Post deleted successfully");
    } else {
      res.status(403).json("Action forbidden");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

  



// Get Timeline POsts
exports.getmyPosts = async (req, res) => {
  const userId = req.params.id;

  try {
    const currentUserPosts = await PostModel.find({ userId: userId });
     

    res.status(200).json(
      currentUserPosts.sort((a, b) => {
          return b.createdAt - a.createdAt; //latest posts  will apear first
        })
    );
  } catch (error) {
    res.status(500).json(error);
  }
};




