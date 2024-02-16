
import admin from 'firebase-admin';

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

export class AuthControllers {
  constructor({ userModel }) {
    this.userModel = userModel;
  }

  login = async (req, res) => {
    const { firebaseToken } = req.body;

    try {
      // Verify the Firebase ID token
      const decodedToken = await admin.auth().verifyIdToken(firebaseToken);

      // Extract user information from the decoded token
      const user = {
        uid: decodedToken.uid,
        email: decodedToken.email,
        displayName: decodedToken.name,
        photoURL: decodedToken.picture,
      };

      // Check if the user exists in the database
      let dbUser = await this.userModel.getbyID({ id: user.uid });

      // If the user does not exist, create a new user
      if (!dbUser) {
        dbUser = await this.userModel.create({ input: user });
      }

      // Generate a JWT or session token for the authenticated user
      // const token = jwt.sign({ id: dbUser.id, email: dbUser.email }, process.env.JWT_SECRET, { expiresIn: process.env.TOKEN_EXPIRY || "30min" });

      // Send response
      // res.cookie("accessToken", token, {
      //   httpOnly: true,
      //   expires: new Date(Date.now() +   1800000) //   30 minutes from now
      // });

      res.status(200).json({ message: "Successfully logged in", user: dbUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server Error' });
    }
  };

  // Additional methods for handling password reset, email verification, etc.
}

    
    