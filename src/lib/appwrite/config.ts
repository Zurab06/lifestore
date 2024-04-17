import { Client, Account, Databases, Storage, Avatars } from "appwrite";
export const appwriteConfig = {
  // projectId: "65c119043ba0df3146ea",
  // url: "https://cloud.appwrite.io/v1",
  url: import.meta.env.VITE_APPWRITE_PROJECT_URL,
  projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
  databaseId: '65c2a77716c64ff3be65',
  storageId: import.meta.env.VITE_APPWRITE_STORAGE_ID,
  userCollectionId: '65c2a8ade0c29edfc566' ,
  postCollectionId: import.meta.env.VITE_APPWRITE_POST_COLLECTION_ID,
  savesCollectionId: import.meta.env.VITE_APPWRITE_SAVES_COLLECTION_ID,
};

export const client = new Client();
client.setProject(appwriteConfig.projectId);
client.setEndpoint(appwriteConfig.url);
export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);
console.log(import.meta.env);


// VITE_APPWRITE_PROJECT_URL='https://cloud.appwrite.io/v1'
// VITE_APPWRITE_PROJECT_ID='65c119043ba0df3146ea',
// VITE_APPWRITE_STORAGE_ID='65c2a71f55ac841b032b'
// VITE_APPWRITE_DATABASE_ID= import.meta.env.VITE_APPWRITE_DATABASE_ID
// VITE_APPWRITE_SAVES_COLLECTION_ID='65c2a8c28f5cee84ad70'
// VITE_APPWRITE_POST_COLLECTION_ID='65c2a817aee62867e1c6'
// VITE_APPWRITE_USER_COLLECTION_ID= import.meta.env.VITE_APPWRITE_USER_COLLECTION_ID
