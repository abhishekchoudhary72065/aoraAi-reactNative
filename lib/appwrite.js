import { Client, Account, ID } from 'react-native-appwrite';


export const appwriteConfig = {
    endpoint: "https://cloud.appwrite.io/v1",
    platform: "com.dazzler.aora",
    projectId: "671cee88000e4563c371",
    databaseId: "671cf41300346c2ef70e",
    userCollectionId: "671cf45c0013cda7bbb7",
    videoCollectionId: "671cf488001b2d27a7f4",
    storageId: "671cf5ee001dc4b0373c"
}

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
    .setProject(appwriteConfig.projectId) // Your project ID
    .setPlatform(appwriteConfig.platform) // Your application ID or bundle ID.
    ;

const account = new Account(client);

// Register User
export const createUser = (email, password, username) => {
    // account.create(ID.unique(), email, password, username)
    account.create(ID.unique(), 'me@example.com', 'password', 'Jane Doe')
        .then(function (response) {
            console.log(response);
        }, function (error) {
            console.log(error);
        });
}